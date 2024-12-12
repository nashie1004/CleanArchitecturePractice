using Application.Common;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.Authenticate
{
    public class AuthenticateResponse : BaseResponse
    {
        public string UserName { get; set; }
        public string UserImage { get; set; }
    }
}
