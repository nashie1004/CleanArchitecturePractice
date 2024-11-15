using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Infra
{
    public class MainContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Audit> Audits { get; set; }

        public MainContext(DbContextOptions opt) : base(opt)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        /*
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var unsavedChanges = ChangeTracker.Entries().Where(e =>
                e.State == EntityState.Added ||
                e.State == EntityState.Modified ||
                e.State == EntityState.Deleted
            );

            var rowsAffected = base.SaveChangesAsync(cancellationToken);

            foreach(var entry in unsavedChanges)
            {
                var audit = new Audit()
                {
                    CreatedDate = DateTime.UtcNow
                    ,CreatedBy = 0
                };

                switch(entry.State)
                {
                    case EntityState.Added:
                        audit.NewData = JsonConvert.SerializeObject(entry.Entity);
                        audit.TablePrimaryKey = entry.Properties.FirstOrDefault(p => p.Metadata.IsPrimaryKey())?.CurrentValue

                        break;
                    case EntityState.Modified:


                        break;
                    case EntityState.Deleted:
                        break;
                    default: break;
                }
            }

            return rowsAffected;
        }
        */
    }
}
