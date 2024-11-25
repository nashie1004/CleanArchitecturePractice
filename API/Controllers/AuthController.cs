using Application.Features.Audit.Queries.GetAllAudit;
using Application.Features.Auth.Commands.ChangePassword;
using Application.Features.Auth.Commands.LoginUser;
using Application.Features.Auth.Commands.RegisterUser;
using Application.Features.Auth.Queries.GetUserDetails;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] LoginUserRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        // TO TEST
        [Authorize]
        [HttpPut("/changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        // TODO
        [Authorize]
        [HttpGet("/getUserDetails")]
        public async Task<IActionResult> GetUserDetails([FromQuery] GetUserDetailsRequest req)
        {
            return Ok(await _mediator.Send(req));
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
