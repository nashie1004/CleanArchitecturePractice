using System;
using Application.Contracts.Infra;
using Domain.Entities;

namespace Application.Contracts.Infrastructure.Persistence.Repository;

public interface IReportsRepository : IBaseRepositoryPersistence<Report>
{

}
