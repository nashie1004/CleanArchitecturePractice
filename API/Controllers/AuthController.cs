﻿using Application.Common;
using Application.Features.Audit.Queries.GetAllAudit;
using Application.Features.Auth.Commands.ChangePassword;
using Application.Features.Auth.Commands.ChangeUserDetails;
using Application.Features.Auth.Commands.LoginUser;
using Application.Features.Auth.Commands.RegisterUser;
using Application.Features.Auth.Queries.Authenticate;
using Application.Features.Auth.Queries.GetUserDetails;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest req)
        {
            var loginResult = await _mediator.Send(req);

            if (!loginResult.IsSuccess || loginResult.ValidationErrors.Count() > 0) return Ok(loginResult);

            Response.Cookies.Append("token", loginResult.JWTToken, new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None, // So that our react app can have access 
                Expires = DateTime.Now.AddMinutes(180)
            });

            loginResult.JWTToken = string.Empty;
            
            return Ok(loginResult);
        }

        [Authorize]
        [HttpGet("authenticate")]
        public async Task<IActionResult> Authenticate()
        {
            return Ok(await _mediator.Send(new AuthenticateRequest()));
        }

        // TO TEST
        [Authorize]
        [HttpPut("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        // TODO
        [Authorize]
        [HttpGet("getUserDetails")]
        public async Task<IActionResult> GetUserDetails([FromQuery] GetUserDetailsRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        [Authorize]
        [HttpPut("changeUserDetails")]
        public async Task<IActionResult> ChangeUserDetails([FromBody] ChangeUserDetailsRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult LogOut()
        {
            Response.Cookies.Delete("token", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddDays(-1)
            });

            return Ok(new BaseResponse());
        }

        /*
        [HttpPost("/resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] GetAllAuditRequest req)
        {
            // TODO
            return Ok(await _mediator.Send(req));
        }

        [HttpGet("/me")]
        public async Task<IActionResult> Me([FromBody] GetAllAuditRequest req)
        {
            // TODO
            return Ok(await _mediator.Send(req));
        }
        */
    }
}
