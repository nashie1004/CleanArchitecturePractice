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
    public class Startup
    {
        public static void Start(IServiceCollection services)
        {
            string connectionString = 
                "Data Source=.\\OCENARSQL;Database=CleanArchitecturePractice;Uid=dev;Pwd=P@ssw0rd;Encrypt=False;TrustServerCertificate=False";

            services.AddDbContext<MainContext>(options =>
                options.UseSqlServer(connectionString)
                ) ;
        }
    }
}
