using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
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
        private readonly IUserRepository _userRepository;
        private readonly IAuditRepository _auditRepository;
        private readonly IUserAuthHistoryRepository _userAuthHistoryRepository;

        public RegisterUserHandler(
            IBaseRepositoryIdentityUser baseRepositoryIdentityUser,
            IUserRepository userRepository,
            IAuditRepository auditRepository,
            IUserAuthHistoryRepository userAuthHistoryRepository
            )
        {
            _baseRepositoryIdentityUser = baseRepositoryIdentityUser;
            _userRepository = userRepository;
            _auditRepository = auditRepository;
            _userAuthHistoryRepository = userAuthHistoryRepository;
        }

        public async Task<RegisterUserResponse> Handle(RegisterUserRequest req, CancellationToken ct)
        {
            var retVal = new RegisterUserResponse();

            try
            {
                var res = await _baseRepositoryIdentityUser.CreateUserAsync(req.UserName, req.Password);

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
