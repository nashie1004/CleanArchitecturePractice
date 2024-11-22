using Application.Contracts.Infrastructure.Identity;
using AutoMapper;
using Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Repository
{
    public class BaseRepositoryIdentityUser : IBaseRepositoryIdentityUser
    {
        private readonly UserManager<CustomUser> _userManager;
        private readonly SignInManager<CustomUser> _signManager;
        private readonly IMapper _mapper;

        public BaseRepositoryIdentityUser(UserManager<CustomUser> userManager, SignInManager<CustomUser> signInManager, IMapper mapper)
        {
            _userManager = userManager;
            _signManager = signInManager;
            _mapper = mapper;
        }

        public async Task<(bool, string)> CreateUserAsync()
        {
            var newUser = new CustomUser() { };

            var retVal = await _userManager.CreateAsync(newUser, "");

            return (true, string.Empty);
        }

        public async Task<(bool, string)> LoginUserAsync()
        {
            return (true, string.Empty);
        }

        public async Task<(bool, string)> GetUserDetailsAsync()
        {
            return (true, string.Empty);
        }

        public async Task<bool> ChangePasswordAsync()
        {
            var user = await _userManager.FindByIdAsync("");
            var retVal = await _userManager.ChangePasswordAsync(user, "", "");

            return true;
        }

        public async Task<bool> LogOutUserAsync()
        {
            return true;
        }
    }
}
