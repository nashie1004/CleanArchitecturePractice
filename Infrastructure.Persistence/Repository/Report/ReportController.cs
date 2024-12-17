using System;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Domain.Entities;
using Infra.Repository;
using Infrastructure.Persistence.Data;

namespace Infrastructure.Persistence.Repository.Report;

public class ReportController : BaseRepositoryPersistence<Domain.Entities.Report>, IReportsRepository
{

    public ReportController(MainContext ctx, IBaseRepositoryIdentityUserHttpContext httpContext) : base(ctx, httpContext)
    {
        
    }
}
