using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Application.Contracts.Infra.Todo;
using Infra.Repository.Todo;

namespace Infra
{
    public static class Program
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<MainContext>(opt =>
                opt.UseSqlite($"Data Source={SQLite.Set()}"));

            services.AddScoped(typeof(ITodoRepository), typeof(TodoRepository));

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