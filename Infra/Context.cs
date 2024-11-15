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

        public MainContext(DbContextOptions<MainContext> opt) : base(opt)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }

    public class AuditContext : DbContext 
    {
        public DbSet<Audit> Audits { get; set; }

        public AuditContext(DbContextOptions<AuditContext> opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
