using Application.Common;
using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.ChangeUserDetails
{
    public class ChangeUserDetailsRequest : BaseRequest, IRequest<ChangeUserDetailsResponse>
    {
        public string Password { get; set; }
        public UserDTO Profile { get; set; }
    }
}
