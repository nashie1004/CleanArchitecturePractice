using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.GetUserDetails
{
    public class GetUserDetailsHandler : IRequestHandler<GetUserDetailsRequest, GetUserDetailsResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;
        private readonly IUserRepository _userRepository;

        public GetUserDetailsHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser,
            IUserRepository userRepository
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _userRepository = userRepository;
        }

        public async Task<GetUserDetailsResponse> Handle(GetUserDetailsRequest req, CancellationToken ct)
        {
            var retVal = new GetUserDetailsResponse();

            try
            {
                var res = await _baseRepositoryIdentityUser.GetUserDetailsAsync(req.UserName, req.Password);

                retVal.IsSuccess = res.Item1;
                retVal.ValidationErrors = res.Item2;
                retVal.UserProfile = res.Item3;
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
