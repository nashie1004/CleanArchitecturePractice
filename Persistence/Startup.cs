using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class Startup
    {

        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<MainContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(@"Server=.\\OCENARSQL;Database=CleanArchitecturePractice;User Id=dev;Password=P@ssw0rd;Trusted_Connection=True;"))
                ) ;

            return services;
        }
    }


}
