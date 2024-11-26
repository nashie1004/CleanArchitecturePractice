using Application.DTOs;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    public static class Program
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = typeof(Program).Assembly;

            services.AddMediatR(configuration => 
                configuration.RegisterServicesFromAssembly(assembly)
            );
            services.AddValidatorsFromAssembly(assembly);
            services.AddAutoMapper(typeof(Mapper));

            return services;
        }
    }
}
