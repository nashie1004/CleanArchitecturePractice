using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.Identity
{
    public interface IBaseRepositoryIdentityUser<T> where T : class
    {
        Task<(bool, string userId)> CreateUserAsync();
        Task<(bool, string userId)> LoginUserAsync();
        Task<(bool, string userId)> GetUserDetailsAsync();
        Task<bool> ChangePasswordAsync();
        Task<bool> LogOutUserAsync();
    }
}
