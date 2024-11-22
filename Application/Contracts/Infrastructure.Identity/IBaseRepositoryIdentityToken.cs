using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.Identity
{
    public interface IBaseRepositoryIdentityToken<T> where T : class
    {
        Task<string> GenerateJWTTokenAsync(string userId, string userName);
    }
}
