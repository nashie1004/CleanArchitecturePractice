using Application.Contracts.Infra;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Infra.Repository;
using Infrastructure.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repository.User
{
    public class UserRepository : BaseRepositoryPersistence<Domain.Entities.User>, IUserRepository
    {
        public UserRepository(MainContext ctx, IBaseRepositoryIdentityUserHttpContext httpContext) : base(ctx, httpContext)
        {
            
        }
    }
}
