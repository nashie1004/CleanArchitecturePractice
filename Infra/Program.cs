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
                opt.UseSqlite("Data Source=../Infra/app.db"));

            services.AddScoped(typeof(ITodoRepository), typeof(TodoRepository));

            return services;
        }
    }
}