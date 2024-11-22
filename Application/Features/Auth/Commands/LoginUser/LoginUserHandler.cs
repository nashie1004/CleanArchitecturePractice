using Application.Contracts.Infrastructure.Identity;
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
                var res = await _baseRepositoryIdentityUser.LoginUserAsync(req.UserName, req.Password);

                retVal.IsSuccess = res.Item1;
                retVal.ValidationErrors = res.Item2;

                //var res2 = await _baseRepositoryIdentityToken.GenerateJWTTokenAsync();
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
