using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Infra
{
    public static class Program
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration) 
        {
            services.AddDbContext<MainContext>(opt =>
                opt.UseSqlite("Data Source=../Infra/app.db"));

            return services;
        }
    }
}