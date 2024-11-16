using Application.Features.Audit.Queries.GetAllAudit;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly IMediator _mediator;

        public WorkoutController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Route("/addWorkout")]
        [HttpGet]
        public async Task<IActionResult> AddWorkout([FromQuery] GetAllAuditRequest req)
        {
            return Ok(await _mediator.Send(req));
        }
    }
}
