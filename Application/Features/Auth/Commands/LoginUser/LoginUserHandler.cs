using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUserRequest, LoginUserResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;
        private readonly IUserRepository _userRepository;
        private readonly IBaseRepositoryIdentityToken _baseRepositoryIdentityToken;
        private readonly IMapper _mapper;

        public LoginUserHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser,
            IBaseRepositoryIdentityToken baseRepositoryIdentityToken,
            IUserRepository userRepository,
            IMapper mapper
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _baseRepositoryIdentityToken = baseRepositoryIdentityToken;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<LoginUserResponse> Handle(LoginUserRequest req, CancellationToken ct)
        {
            var retVal = new LoginUserResponse();

            try
            {
                var loginAttempt = await _baseRepositoryIdentityUser.LoginUserAsync(req.UserName, req.Password);

                retVal.IsSuccess = loginAttempt.Item1;
                retVal.ValidationErrors = loginAttempt.Item2;

                // LOGIN FAILED
                if (!retVal.IsSuccess) return retVal;

                // SUCCESS
                var userData = await _userRepository
                    .GetRecordByPropertyAsync(i => i.IdentityImplementationId == loginAttempt.Item3);

                if (userData == null)
                {
                    retVal.IsSuccess = false;
                    retVal.ValidationErrors.Add("Identity login successful but no user found");

                    return retVal;
                }

                retVal.UserProfile = _mapper.Map<UserDTO>(userData);

                retVal.JWTToken = await _baseRepositoryIdentityToken
                    .GenerateJWTTokenAsync(
                        retVal.UserProfile.UserId.ToString(), retVal.UserProfile.UserName
                    );
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
