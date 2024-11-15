using Application.Contracts.Infra;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>
     where T : class
    {
        private readonly MainContext _context;

        public BaseRepository(MainContext context)
        {
            _context = context;
        }

        public async Task AddRecordAsync(T record)
        {
            if (record is AuditableEntity auditable) { 
                auditable.CreatedDate = DateTime.Now;
                //auditable.CreatedBy = 0;
            }

            await _context.Set<T>().AddAsync(record);
        }

        public async Task<bool> DeleteRecordAsync(long id)
        {
            var record = await this.GetRecordAsync(id);

            if (record is not null)
            {
                _context.Set<T>().Remove(record);
                return true;
            }

            return false;
        }

        public async Task<T> GetRecordAsync(long id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAllRecordAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<int> SaveRecordAsync(CancellationToken ct)
        {
            var entries = _context.ChangeTracker.Entries<AuditableEntity>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedDate = DateTime.UtcNow;
                    //entry.Entity.CreatedBy = 0;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.LastUpdatedDate = DateTime.UtcNow;
                    //entry.Entity.LastUpdatedBy = 0;
                }
            }

            return await _context.SaveChangesAsync(ct);
        }
    }

}
