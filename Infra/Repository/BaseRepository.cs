using Application.Contracts.Infra;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Domain.Entities;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Audit = Domain.Entities.Audit;

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
            return await _context.Set<T>().AsNoTracking().ToListAsync();
        }
        public async Task<List<T>> GetAllRecordAsync(int pageSize = 15, int pageNo = 1)
        {
            var list = await _context
                .Set<T>()
                .AsNoTracking()
                .Skip((pageNo - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return list;
        }

        public async Task<int> SaveRecordAsync(CancellationToken ct)
        {
            var entries = _context.ChangeTracker.Entries<AuditableEntity>().ToList();

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

            var toAudit = _context.ChangeTracker.Entries().Where(i => 
                i.State == EntityState.Added ||
                i.State == EntityState.Modified ||
                i.State == EntityState.Deleted
            );

            var audits = new List<Domain.Entities.Audit>();

            foreach (var entry in toAudit)
            {
                var audit = new Domain.Entities.Audit()
                {
                    CreatedDate = DateTime.UtcNow
                    //,CreatedBy = 0
                    ,TableName = entry.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entry)
                };

                switch(entry.State)
                {
                    case EntityState.Added:
                        audit.Action = (short)EntityState.Added;
                        audit.NewData = JsonConvert.SerializeObject(entry.Entity);

                        break;
                    case EntityState.Modified:
                        audit.Action = (short)EntityState.Modified;
                        audit.OldData = JsonConvert.SerializeObject(entry.OriginalValues.ToObject());
                        audit.NewData = JsonConvert.SerializeObject(entry.Entity);
                        audit.LastUpdatedDate = DateTime.UtcNow;
                        //audit.LastUpdatedBy = 0;

                        break;
                    case EntityState.Deleted:
                        audit.Action = (short)EntityState.Deleted;
                        audit.OldData = JsonConvert.SerializeObject(entry.Entity);
                        audit.LastUpdatedDate = DateTime.UtcNow;

                        break;
                    default:
                        break;
                }

                audits.Add(audit);
            }

            _context.Audits.AddRange(audits);

            return await _context.SaveChangesAsync(ct);
        }

        private long GetPrimaryKey(EntityEntry entry)
        {
            try
            {
                var primaryKeyProperty = entry.Metadata.FindPrimaryKey()?.Properties.First();
                var key = entry.Property(primaryKeyProperty.Name).CurrentValue;
                if (key == null) { return 0; }
                return Convert.ToInt64(key);
            } 
            catch(Exception ex)
            {
                return 0;
            }
        }
    }

}
