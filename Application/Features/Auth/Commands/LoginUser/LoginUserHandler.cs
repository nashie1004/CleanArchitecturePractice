﻿using Application.Contracts.Infrastructure.Identity;
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
        private readonly IBaseRepositoryIdentityToken _baseRepositoryIdentityToken;

        public LoginUserHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser,
            IBaseRepositoryIdentityToken baseRepositoryIdentityToken
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _baseRepositoryIdentityToken = baseRepositoryIdentityToken;
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
                var userDetails = await _baseRepositoryIdentityUser.GetUserDetailsAsync(req.UserName, req.Password);

                retVal.IsSuccess = userDetails.Item1;

                retVal.JWTToken = await _baseRepositoryIdentityToken
                    .GenerateJWTTokenAsync(
                        userDetails.Item3.UserId.ToString(), userDetails.Item3.UserName
                    );

                retVal.UserProfile = userDetails.Item3;

                // TODO: Implement Set browser cookies
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
