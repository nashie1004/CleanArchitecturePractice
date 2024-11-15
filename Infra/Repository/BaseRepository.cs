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
            int rowsAffected = 0;
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

            var addedEntities = _context.ChangeTracker.Entries().Where(i => i.State == EntityState.Added).ToList();
            var modifiedEntities = _context.ChangeTracker.Entries().Where(i => i.State == EntityState.Modified).ToList();
            var deletedEntities = _context.ChangeTracker.Entries().Where(i => i.State == EntityState.Deleted).ToList();

            rowsAffected = await _context.SaveChangesAsync(ct);

            foreach(var entry in addedEntities)
            {
                _context.Audits.Add(new Domain.Entities.Audit()
                {
                    CreatedDate = DateTime.UtcNow
                    //,CreatedBy = 0
                    ,TableName = entry.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entry)
                    ,Action = (short)EntityState.Added
                    ,NewData = JsonConvert.SerializeObject(entry.Entity)
                });
            }

            foreach (var entry in modifiedEntities)
            {
                _context.Audits.Add(new Domain.Entities.Audit()
                {
                    TableName = entry.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entry)
                    ,Action = (short)EntityState.Modified
                    ,OldData = JsonConvert.SerializeObject(entry.OriginalValues.ToObject())
                    ,NewData = JsonConvert.SerializeObject(entry.Entity)
                    ,LastUpdatedDate = DateTime.UtcNow
                    //,LastUpdatedBy = 0
                });
            }

            foreach (var entry in deletedEntities)
            {
                _context.Audits.Add(new Domain.Entities.Audit()
                {
                    TableName = entry.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entry)
                    ,Action = (short)EntityState.Deleted
                    ,OldData = JsonConvert.SerializeObject(entry.Entity)
                    ,LastUpdatedDate = DateTime.UtcNow
                    //,LastUpdatedBy = 0
                });
            }

            await _context.SaveChangesAsync(ct);

            return rowsAffected;
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
