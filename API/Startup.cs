using Application;
using Infra;
using Infrastructure.Identity;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddControllers();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WorkoutTracker API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter your JWT token in the following format: 'Bearer {token}'"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                new string[] {}
            }
        });
    });

    builder.Services.AddApplication();
    builder.Services.AddInfrastructurePersistence(builder.Configuration);
    builder.Services.AddInfrastructureIdentity(builder.Configuration);

    builder.Services.AddCors(opts =>
    {
        opts.AddPolicy("AllowReactApp", policy =>
        {
            policy.WithOrigins("http://localhost:61216")  // Specify the allowed origin
                  .AllowAnyMethod()  // Allow any HTTP method (GET, POST, etc.)
                  .AllowAnyHeader()  // Allow any header
                  .AllowCredentials();  // Allow credentials (cookies, HTTP authentication)
        });
    });

    /*
    builder.Services.AddSpaStaticFiles(c =>
    {
        c.RootPath = "dist";
    });
    */
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseCors("AllowReactApp");
        //app.UseCors(b => b.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
    }

    app.UseHttpsRedirection();

    app.UseRouting();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapDefaultControllerRoute();
    });

    app.UseAuthorization();

    app.MapControllers();

    /*
    app.UseSpaStaticFiles();

    app.UseSpa(b =>
    {
        if (app.Environment.IsDevelopment())
        {
            b.UseProxyToSpaDevelopmentServer("http://localhost:61216");
        }
    });
    */

    app.Run();
}
