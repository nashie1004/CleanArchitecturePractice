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

        public AuthenticateHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<AuthenticateResponse> Handle(AuthenticateRequest req, CancellationToken ct)
        {
            var retVal = new AuthenticateResponse();

            try
            {
                long userId = 0;
                bool validId = long.TryParse(req.UserIdString, out userId);

                if (string.IsNullOrEmpty(req.UserIdString) || !validId || userId == 0)
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
