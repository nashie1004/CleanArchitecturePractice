using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
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
        private readonly IUserAuthHistoryRepository _userAuthHistoryRepository;

        public BaseRepositoryIdentityUser(
            UserManager<CustomUser> userManager, 
            SignInManager<CustomUser> signInManager, IMapper mapper, 
            IBaseRepositoryIdentityToken baseRepositoryIdentityToken,
            IUserRepository userRepository,
            IAuditRepository auditRepository,
            IUserAuthHistoryRepository userAuthHistoryRepository
            )
        {
            _userManager = userManager;
            _signManager = signInManager;
            _mapper = mapper;
            _baseRepositoryIdentityToken = baseRepositoryIdentityToken;
            _userRepository = userRepository;
            _auditRepository = auditRepository;
            _userAuthHistoryRepository = userAuthHistoryRepository;
        }

        public async Task<(bool, List<string>, long)> CreateUserAsync(UserDTO profileInfo, string password)
        {
            var newIdentityUser = new CustomUser()
            {
                UserName = profileInfo.UserName,
            };

            // 1. Save to ASP.NET Identity Table
            var identityResult = await _userManager.CreateAsync(newIdentityUser, password);

            if (!identityResult.Succeeded)
            {
                return (false, identityResult.Errors.Select(i => i.Description).ToList(), 0);
            }

            var newBaseUser = new Domain.Entities.User()
            {
                UserName = profileInfo.UserName,
                Weight = profileInfo.Weight,
                WeightMeasurement = profileInfo.WeightMeasurement,
                Height = profileInfo.Height,
                HeightMeasurement = profileInfo.HeightMeasurement,
                ProfileImageUrl = profileInfo.ProfileImageUrl,
                DateOfBirth = profileInfo.DateOfBirth,
                Gender = profileInfo.Gender,
                IdentityImplementationId = newIdentityUser.Id
            };

            // 2. Save to Main User Table
            await _userRepository.AddRecordAsync(newBaseUser);
            await _userRepository.SaveRecordAsync();

            // 3. Save to Audit Table
            await _auditRepository.AddRecordAsync(new Domain.Entities.Audit()
            {
                CreatedDate = DateTime.UtcNow,
                CreatedBy = newBaseUser.UserId,
                TableName = "AspNetUsers",
                TablePrimaryKey = newIdentityUser.Id,
                Action = (short)EntityState.Added,
                NewData = JsonConvert.SerializeObject(newIdentityUser)

            });
            await _auditRepository.SaveRecordNoAuditAsync();

            // 4. Save to Auth History Table
            await _userAuthHistoryRepository.AddRecordAsync(new Domain.Entities.UserAuthHistory()
            {
                Action = UserAuthAction.Register,
                CreatedBy = newBaseUser.UserId
            });
            await _userAuthHistoryRepository.SaveRecordAsync();

            return (true, new List<string>(), newIdentityUser.Id);
        }

        public async Task<(bool, List<string>, long)> LoginUserAsync(string userName, string password)
        {
            var validationMsgs = new List<string>();
            var identityUser = await _userManager.FindByNameAsync(userName);

            if (identityUser == null)
            {
                validationMsgs.Add("Invalid username or password");

                return (false, validationMsgs, 0);
            }

            var loginOk = await _userManager.CheckPasswordAsync(identityUser, password);

            if (!loginOk)
            {
                validationMsgs.Add("Invalid password");

                return (false, validationMsgs, 0);
            }

            // 1. Get User from Main Table
            var baseUser = await _userRepository.GetRecordByPropertyAsync(i => i.IdentityImplementationId == identityUser.Id);

            // 2. Save to Auth History Table
            await _userAuthHistoryRepository.AddRecordAsync(new Domain.Entities.UserAuthHistory()
            {
                Action = UserAuthAction.Login,
                CreatedBy = baseUser.UserId
            });
            await _userAuthHistoryRepository.SaveRecordAsync();

            return (true, validationMsgs, identityUser.Id);
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

            var identityUser = await _userManager.FindByNameAsync(userName);

            if (identityUser == null)
            {
                validationMsgs.Add("No user found");
                return (false, validationMsgs);
            }

            var retVal = await _userManager.ChangePasswordAsync(identityUser, oldPassword, newPassword);

            if (!retVal.Succeeded)
            {
                return (false, retVal.Errors.Select(i => i.Description).ToList());
            }

            // 1. Get User from Main Table
            var baseUser = await _userRepository.GetRecordByPropertyAsync(i => i.IdentityImplementationId == identityUser.Id);

            // 2. Save to Auth History Table
            await _userAuthHistoryRepository.AddRecordAsync(new Domain.Entities.UserAuthHistory()
            {
                Action = UserAuthAction.ChangePassword,
                CreatedBy = baseUser.UserId
            });
            await _userAuthHistoryRepository.SaveRecordAsync();

            return (true, validationMsgs);
        }

        //public async Task<bool> LogOutUserAsync()
        //{
        //    return true;
        //}

        public async Task<bool> CheckPasswordAsync(string userName, string password)
        {
            var identityUser = await _userManager.FindByNameAsync(userName);

            if (identityUser == null) return false;

            return await _userManager.CheckPasswordAsync(identityUser, password);
        }

        public async Task<long> GetUserImplementationIdAsync(string userName, string password)
        {
            var identityUser = await _userManager.FindByNameAsync(userName);

            if (identityUser == null) return 0;

            return identityUser.Id;
        }

    }
}
