﻿using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;
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
        private readonly IUserRepository _userRepository;
        private readonly IAuditRepository _auditRepository;

        public BaseRepositoryIdentityUser(
            UserManager<CustomUser> userManager, 
            SignInManager<CustomUser> signInManager, IMapper mapper, 
            IBaseRepositoryIdentityToken baseRepositoryIdentityToken,
            IUserRepository userRepository,
            IAuditRepository auditRepository
            )
        {
            _userManager = userManager;
            _signManager = signInManager;
            _mapper = mapper;
            _baseRepositoryIdentityToken = baseRepositoryIdentityToken;
            _userRepository = userRepository;
            _auditRepository = auditRepository;
        }

        public async Task<(bool, List<string>, long)> CreateUserAsync(string userName, string password)
        {
            var newIdentityUser = new CustomUser()
            {
                UserName = userName,
            };

            var identityResult = await _userManager.CreateAsync(newIdentityUser, password);

            if (!identityResult.Succeeded)
            {
                return (false, identityResult.Errors.Select(i => i.Description).ToList(), 0);
            }

            var newBaseUser = new Domain.Entities.User()
            {
                UserName = userName,
                IdentityImplementationId = newIdentityUser.Id
            };

            // Save to Main Table
            await _userRepository.AddRecordAsync(newBaseUser);
            await _userRepository.SaveRecordAsync();

            // Save to Audit Table
            await _auditRepository.AddRecordAsync(new Domain.Entities.Audit()
            {
                CreatedDate = DateTime.UtcNow,
                CreatedBy = newBaseUser.UserId,
                TableName = "AspNetUsers",
                TablePrimaryKey = newIdentityUser.Id,
                Action = (short)EntityState.Added,
                NewData = JsonConvert.SerializeObject(identityResult)

            });
            await _auditRepository.SaveRecordNoAuditAsync();

            return (true, new List<string>(), newIdentityUser.Id);
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

        public async Task<(bool, List<string>, UserDTO)> GetUserDetailsAsync(string userName, string password)
        {
            var validationMsgs = new List<string>();

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
            {
                validationMsgs.Add("No user found");
                return (false, validationMsgs, new UserDTO());
            }

            // TODO
            // MAY NEED TO ADD DTO
            var retVal = _mapper.Map<UserDTO>(user);

            return (true, validationMsgs, retVal);
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

        private long GetPrimaryKey(EntityEntry entry)
        {
            try
            {
                var primaryKeyProperty = entry.Metadata.FindPrimaryKey()?.Properties.First();
                var key = entry.Property(primaryKeyProperty.Name).CurrentValue;
                if (key == null) { return 0; }
                return Convert.ToInt64(key);
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}