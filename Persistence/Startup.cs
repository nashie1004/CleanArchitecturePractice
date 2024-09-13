using Microsoft.EntityFrameworkCore;
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
        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            string connectionString =
                //"Data Source=.\\OCENARSQL;Database=CleanArchitecturePractice;Uid=dev;Pwd=P@ssw0rd;Encrypt=False;TrustServerCertificate=False";
                "Server=.\\OCENARSQL;Database=CleanArchitecturePractice;User Id=dev;Password=P@ssw0rd;Trusted_Connection=True;";

            services.AddDbContext<MainContext>(options =>
                options.UseSqlServer(connectionString)
                ) ;

            return services;
        }
    }
}
