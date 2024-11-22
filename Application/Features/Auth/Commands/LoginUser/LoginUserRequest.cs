using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.LoginUser
{
    public class LoginUserRequest : IRequest<LoginUserResponse>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
