using Application.Contracts.Infrastructure.Persistence.Repository;
using Domain.Entities;
using Infra.Repository;
using Infrastructure.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repository.User
{
    public class UserAuthHistoryRepository : BaseRepositoryPersistence<UserAuthHistory>, IUserAuthHistoryRepository
    {
        public UserAuthHistoryRepository(MainContext ctx) : base(ctx) 
        {
            
        }
    }
}
