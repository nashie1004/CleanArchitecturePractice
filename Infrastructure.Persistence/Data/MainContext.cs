using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Data
{
    public class MainContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Audit> Audits { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<WorkoutHeader> WorkoutHeaders { get; set; }
        public DbSet<WorkoutDetail> WorkoutDetails { get; set; }
        public DbSet<User> Users { get; set; }

        public MainContext(DbContextOptions<MainContext> opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
