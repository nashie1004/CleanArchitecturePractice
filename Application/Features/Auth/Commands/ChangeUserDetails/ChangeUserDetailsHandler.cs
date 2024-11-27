using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.ChangeUserDetails
{
    public class ChangeUserDetailsHandler : IRequestHandler<ChangeUserDetailsRequest, ChangeUserDetailsResponse>
    {
        private readonly IBaseRepositoryIdentityUser _baseRepositoryIdentityUser;
        private readonly IUserRepository _userRepository;


        public ChangeUserDetailsHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser
            , IUserRepository userRepository
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _userRepository = userRepository;
        }

        public async Task<ChangeUserDetailsResponse> Handle(ChangeUserDetailsRequest req, CancellationToken ct)
        {
            var retVal = new ChangeUserDetailsResponse();
         
            try
            {
                var userAuthId = await _baseRepositoryIdentityUser.GetUserImplementationIdAsync(req.Profile.UserName, req.Password);

                if (userAuthId == 0)
                {
                    retVal.IsSuccess = false;
                    retVal.SuccessMessage = "Incorrect password or username";
                    return retVal;
                }

                var user = await _userRepository.GetRecordByPropertyAsync(i => i.IdentityImplementationId == userAuthId);

                user.Weight = req.Profile.Weight;
                user.WeightMeasurement = req.Profile.WeightMeasurement;
                user.Height = req.Profile.Height;
                user.HeightMeasurement = req.Profile.HeightMeasurement;
                user.ProfileImageUrl = req.Profile.ProfileImageUrl;
                user.DateOfBirth = req.Profile.DateOfBirth;
                user.Gender = req.Profile.Gender;

                retVal.RowsAffected = await _userRepository.SaveRecordAsync(ct);
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
