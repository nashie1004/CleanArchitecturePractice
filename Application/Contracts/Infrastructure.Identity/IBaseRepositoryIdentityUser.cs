using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.Identity
{
    public interface IBaseRepositoryIdentityUser
    {
        Task<(bool, List<string>, long)> CreateUserAsync(string userName, string password);
        Task<(bool, List<string>, long)> LoginUserAsync(string userName, string password);
        Task<(bool, List<string>)> GetUserDetailsAsync(string userName, string password);
        Task<(bool, List<string>)> ChangePasswordAsync(string userName, string oldPassword, string newPassword);
        //Task<bool> LogOutUserAsync();
    }
}
