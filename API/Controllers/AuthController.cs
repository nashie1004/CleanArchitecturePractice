using Application.Features.Audit.Queries.GetAllAudit;
using MediatR;
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
        public async Task<IActionResult> Register([FromBody] GetAllAuditRequest req)
        {
            // TODO
            return Ok(await _mediator.Send(req));
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] GetAllAuditRequest req)
        {
            // TODO
            return Ok(await _mediator.Send(req));
        }

        [HttpPost("/logout")]
        public async Task<IActionResult> Logout([FromBody] GetAllAuditRequest req)
        {
            // TODO
            return Ok(await _mediator.Send(req));
        }

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
    }
}
