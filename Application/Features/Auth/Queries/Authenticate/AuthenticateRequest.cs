using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.Authenticate
{
    public class AuthenticateRequest : IRequest<AuthenticateResponse>
    {
        public long UserId { get; set; }
    }
}
