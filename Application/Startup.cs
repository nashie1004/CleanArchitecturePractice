﻿using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application
{
    public static class Startup
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            var assembly = typeof(Startup).Assembly;

            services.AddMediatR(configuration => 
                configuration.RegisterServicesFromAssembly(assembly)
            );
            services.AddValidatorsFromAssembly(assembly);

            return services;
        }
    }
}
