using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.Authenticate
{
    public class AuthenticateHandler : IRequestHandler<AuthenticateRequest, AuthenticateResponse>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IBaseRepositoryIdentityUserHttpContext _identityUserHttpContext;

        public AuthenticateHandler(
            IUserRepository userRepository, IMapper mapper
            ,IBaseRepositoryIdentityUserHttpContext identityUserHttpContext
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _identityUserHttpContext = identityUserHttpContext;
        }

        public async Task<AuthenticateResponse> Handle(AuthenticateRequest req, CancellationToken ct)
        {
            var retVal = new AuthenticateResponse();

            try
            {
                long userId = _identityUserHttpContext.GetUserId();

                if (userId == 0)
                {
                    retVal.IsSuccess = false;
                    retVal.ValidationErrors.Add("Unauthorized accesss");
                    return retVal;
                };

                var res = await _userRepository.GetRecordAsync(userId);

                if (res == null)
                {
                    retVal.IsSuccess = false;
                    retVal.ValidationErrors.Add("No user found");
                    return retVal;
                }

                retVal.UserName = res.UserName;
                retVal.UserImage = res.ProfileImageUrl;
            }
            catch (Exception ex) 
            { 
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
