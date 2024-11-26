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

namespace Application.Features.Auth.Queries.GetUserDetails
{
    public class GetUserDetailsHandler : IRequestHandler<GetUserDetailsRequest, GetUserDetailsResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserDetailsHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser,
            IUserRepository userRepository,
            IMapper mapper
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<GetUserDetailsResponse> Handle(GetUserDetailsRequest req, CancellationToken ct)
        {
            var retVal = new GetUserDetailsResponse();

            try
            {
                var userAuthId = await _baseRepositoryIdentityUser.GetUserImplementationIdAsync(req.UserName, req.Password);

                if (userAuthId == 0)
                {
                    retVal.IsSuccess = false;
                    retVal.SuccessMessage = "Incorrect username or password";
                }

                var user = await _userRepository.GetRecordByPropertyAsync(i => i.IdentityImplementationId == userAuthId);
                retVal.UserProfile = _mapper.Map<UserDTO>(user);
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
