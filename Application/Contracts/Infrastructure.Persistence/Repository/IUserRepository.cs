using Application.Contracts.Infra;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.Persistence.Repository
{
    public interface IUserRepository : IBaseRepositoryPersistence<User>
    {
    }
}
