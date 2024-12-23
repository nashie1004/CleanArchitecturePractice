﻿using Application.Contracts.Infrastructure.Identity;
using Infrastructure.Identity.Data;
using Infrastructure.Identity.Models;
using Infrastructure.Identity.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure.Identity
{
    public static class Program
    {
        public static IServiceCollection AddInfrastructureIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            string issuer = configuration["Jwt:Issuer"];
            string audience = configuration["Jwt:Audience"];
            string secretKey = configuration["Jwt:Key"];
            double expiresInMins = double.Parse(configuration["Jwt:ExpiresInMinutes"]);

            services.AddDbContext<IdentityContext>(opt =>
                opt.UseSqlite($"Data Source={SQLite.Set()}"));

            services.AddIdentity<CustomUser, CustomRole>()
                .AddEntityFrameworkStores<IdentityContext>()
                .AddDefaultTokenProviders();

            // For react app
            services.AddAuthentication(opt =>
                    {
                        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                .AddCookie(opt =>
                {
                    opt.Cookie.Name = "token";
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                    };

                    options.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived = (ctx) =>
                        {
                            ctx.Token = ctx.Request.Cookies["token"];

                            Console.WriteLine($"{DateTime.Now}: ", ctx.Token);

                            return Task.CompletedTask;
                        }
                    };
                })
                ;

            services.AddScoped(typeof(IBaseRepositoryIdentityUser), typeof(BaseRepositoryIdentityUser));
            services.AddScoped(typeof(IBaseRepositoryIdentityUserHttpContext), typeof(BaseRepositoryIdentityUserHttpContext));
            services.AddScoped<IBaseRepositoryIdentityToken>(opt =>
            {
                return new BaseRepositoryIdentityToken(
                    secretKey, issuer, audience, expiresInMins
                    );

            });
            services.AddAutoMapper(typeof(Infrastructure.Identity.Mapper.Mapper));

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

            return $"../Infrastructure.Identity/{folder}/app.db";
        }
    }
}
