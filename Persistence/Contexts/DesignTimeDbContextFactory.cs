using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Persistence.Contexts;
using System.IO;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<MainContext>
{

    public MainContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<MainContext>();
        optionsBuilder.UseSqlServer(@"Server=.\\OCENARSQL;Database=CleanArchitecturePractice;User Id=dev;Password=P@ssw0rd;Trusted_Connection=True;"); // Use the appropriate connection string

        return new MainContext(optionsBuilder.Options);
    }
}
