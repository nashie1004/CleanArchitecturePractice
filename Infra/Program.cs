﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Application.Contracts.Infra.Todo;
using Infra.Repository.Todo;
using Infra.Repository.Audit;
using Infra.Repository.Exercise;
using Application.Contracts.Infra.Repos;
using Infra.Repository.Workout;

namespace Infra
{
    public static class Program
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<MainContext>(opt =>
                opt.UseSqlite($"Data Source={SQLite.Set()}"));

            services.AddScoped(typeof(ITodoRepository), typeof(TodoRepository));
            services.AddScoped(typeof(IAuditRepository), typeof(AuditRepository));
            services.AddScoped(typeof(IExerciseRepository), typeof(ExerciseRepository));
            services.AddScoped(typeof(IWorkoutHeaderRepository), typeof(WorkoutHeaderRepository));
            services.AddScoped(typeof(IWorkoutDetailRepository), typeof(WorkoutDetailRepository));

            return services;
        }
    }

    public static class SQLite
    {
        public static string Set()
        {
            var folder = "SQLiteDB";
            var path = Path.Combine(Directory.GetCurrentDirectory(), folder);

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return $"../Infra/{folder}/app.db";
        }
    }
}