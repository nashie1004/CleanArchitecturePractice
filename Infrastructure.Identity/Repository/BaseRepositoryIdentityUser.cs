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
        private readonly IBaseRepositoryIdentityToken _baseRepositoryIdentityToken;

        public BaseRepositoryIdentityUser(
            UserManager<CustomUser> userManager, 
            SignInManager<CustomUser> signInManager, IMapper mapper, 
            IBaseRepositoryIdentityToken baseRepositoryIdentityToken
            )
        {
            _userManager = userManager;
            _signManager = signInManager;
            _mapper = mapper;
            _baseRepositoryIdentityToken = baseRepositoryIdentityToken;
        }

        public async Task<(bool, List<string>, long)> CreateUserAsync(string userName, string password)
        {
            var newUser = new CustomUser()
            {
                UserName = userName,
            };

            var identityResult = await _userManager.CreateAsync(newUser, password);

            if (!identityResult.Succeeded)
            {
                return (false, identityResult.Errors.Select(i => i.Description).ToList(), 0);
            }

            return (true, new List<string>(), newUser.Id);
        }

        public async Task<(bool, List<string>, long)> LoginUserAsync(string userName, string password)
        {
            var validationMsgs = new List<string>();
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                validationMsgs.Add("Invalid username or password");

                return (false, validationMsgs, 0);
            }

            var loginOk = await _userManager.CheckPasswordAsync(user, password);

            if (!loginOk)
            {
                validationMsgs.Add("Invalid password");

                return (false, validationMsgs, 0);
            }

            // TODO: GENERATE TOKEN
            return (true, validationMsgs, user.Id);
        }

        public async Task<(bool, List<string>)> GetUserDetailsAsync(string userName, string password)
        {
            var validationMsgs = new List<string>();

            // TODO
            // MAY NEED TO ADD DTO

            return (true, validationMsgs);
        }

        public async Task<(bool, List<string>)> ChangePasswordAsync(string userName, string oldPassword, string newPassword)
        {
            var validationMsgs = new List<string>();

            var user = await _userManager.FindByIdAsync("");

            if (user == null)
            {
                return (false, validationMsgs);
            }

            var retVal = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            if (!retVal.Succeeded)
            {
                return (false, retVal.Errors.Select(i => i.Description).ToList());
            }

            return (true, validationMsgs);
        }

        //public async Task<bool> LogOutUserAsync()
        //{
        //    return true;
        //}
    }
}
