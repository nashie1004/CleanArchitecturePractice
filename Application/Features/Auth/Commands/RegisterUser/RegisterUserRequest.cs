﻿using Application.DTOs;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.RegisterUser
{
    public class RegisterUserRequest : IRequest<RegisterUserResponse>
    {
        public string Password { get; set; }
        public UserDTO RegisterInfo { get; set; }
    }
}
