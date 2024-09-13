using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    public class Startup
    {
        public static void Start(IServiceCollection services)
        {
            var assembly = typeof(Startup).Assembly;

            services.AddMediatR(configuration => 
                configuration.RegisterServicesFromAssembly(assembly)
            );
            services.AddValidatorsFromAssembly(assembly);
        }
    }
}
