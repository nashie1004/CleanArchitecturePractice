using Application.Common;
using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Queries.GetUserDetails
{
    public class GetUserDetailsResponse : BaseResponse
    {
        public UserDTO UserProfile { get; set; }
    }
}
