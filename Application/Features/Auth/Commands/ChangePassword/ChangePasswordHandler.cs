using Application.Contracts.Infrastructure.Identity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.ChangePassword
{
    public class ChangePasswordHandler : IRequestHandler<ChangePasswordRequest, ChangePasswordResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;

        public ChangePasswordHandler(
                IBaseRepositoryIdentityUser baseRepositoryIdentityUser
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
        }

        public async Task<ChangePasswordResponse> Handle(ChangePasswordRequest req, CancellationToken ct)
        {
            var retVal = new ChangePasswordResponse();

            try
            {
                var res = await _baseRepositoryIdentityUser.ChangePasswordAsync(req.UserName, req.OldPassword, req.NewPassword);

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
