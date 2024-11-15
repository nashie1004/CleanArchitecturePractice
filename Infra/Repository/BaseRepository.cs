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
using MediatR;

namespace Infra.Repository
{
    public class BaseRepository<T> : IBaseRepository<T>
     where T : class
    {
        private readonly MainContext _mainContext;
        private readonly AuditContext _auditContext;

        public BaseRepository(MainContext mainContext, AuditContext auditContext)
        {
            _mainContext = mainContext;
            _auditContext = auditContext;
        }

        public async Task AddRecordAsync(T record)
        {
            await _mainContext.Set<T>().AddAsync(record);
        }

        public async Task<bool> DeleteRecordAsync(long id)
        {
            var record = await this.GetRecordAsync(id);

            if (record is not null)
            {
                _mainContext.Set<T>().Remove(record);
                return true;
            }

            return false;
        }

        public async Task<T> GetRecordAsync(long id)
        {
            return await _mainContext.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAllRecordAsync()
        {
            return await _mainContext.Set<T>().AsNoTracking().ToListAsync();
        }
        public async Task<List<T>> GetAllRecordAsync(int pageSize = 15, int pageNo = 1)
        {
            var list = await _mainContext
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
            var entries = _mainContext.ChangeTracker.Entries<AuditableEntity>().ToList();

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

            var addedEntities = _mainContext.ChangeTracker.Entries().Where(i => i.State == EntityState.Added);
            var modifiedEntities = _mainContext.ChangeTracker.Entries().Where(i => i.State == EntityState.Modified);
            var deletedEntities = _mainContext.ChangeTracker.Entries().Where(i => i.State == EntityState.Deleted);

            rowsAffected = await _mainContext.SaveChangesAsync(ct);

            foreach(var entity in addedEntities)
            {
                _auditContext.Audits.Add(new Domain.Entities.Audit()
                {
                    CreatedDate = DateTime.UtcNow
                    //,CreatedBy = 0
                    ,TableName = entity.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entity)
                    ,Action = (short)EntityState.Added
                    ,NewData  = JsonConvert.SerializeObject(entity.Entity)
                });
            }

            foreach (var entity in addedEntities)
            {
                _auditContext.Audits.Add(new Domain.Entities.Audit()
                {
                    TableName = entity.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entity)
                    ,Action = (short)EntityState.Modified
                    ,OldData = JsonConvert.SerializeObject(entity.OriginalValues.ToObject())
                    ,NewData = JsonConvert.SerializeObject(entity.Entity)
                    ,LastUpdatedDate = DateTime.UtcNow
                    //,LastUpdatedBy = 0;
                });
            }

            foreach (var entity in addedEntities)
            {
                _auditContext.Audits.Add(new Domain.Entities.Audit()
                {
                    TableName = entity.Metadata.GetTableName() ?? string.Empty
                    ,TablePrimaryKey = GetPrimaryKey(entity)
                    ,Action = (short)EntityState.Deleted
                    ,OldData = JsonConvert.SerializeObject(entity.Entity)
                    ,LastUpdatedDate = DateTime.UtcNow
                    //,LastUpdatedBy = 0;
                });
            }

            await _auditContext.SaveChangesAsync();

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
