using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUserRequest, RegisterUserResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;

        public RegisterUserHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
        }

        public async Task<RegisterUserResponse> Handle(RegisterUserRequest req, CancellationToken ct)
        {
            var retVal = new RegisterUserResponse();

            try
            {
                var userDto = new UserDTO()
                {
                    UserName = req.UserName,
                };

                var res = await _baseRepositoryIdentityUser.CreateUserAsync(userDto, req.Password, req.Email);

                retVal.IsSuccess = res.Item1;
                retVal.ValidationErrors = res.Item2;    
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
