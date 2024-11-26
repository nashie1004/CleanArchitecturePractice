using Application.DTOs;
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
        Task<(bool, List<string>, long)> CreateUserAsync(UserDTO profileInfo, string password);
        Task<(bool, List<string>, long)> LoginUserAsync(string userName, string password);
        Task<(bool, List<string>, UserDTO)> GetUserDetailsAsync(string userName, string password);
        Task<(bool, List<string>)> ChangePasswordAsync(string userName, string oldPassword, string newPassword);
        Task<bool> CheckPasswordAsync(string userName, string password);
        Task<long> GetUserImplementationIdAsync(string userName, string password);
        //Task<bool> LogOutUserAsync();
    }
}
