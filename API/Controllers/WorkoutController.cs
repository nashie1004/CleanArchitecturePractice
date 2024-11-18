using Application.Features.Audit.Queries.GetAllAudit;
using Application.Features.Workout.WorkoutHeader.Commands.AddWorkoutHeader;
using Application.Features.Workout.WorkoutHeader.Queries.GetManyWorkoutHeader;
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

        [Route("/addWorkoutHeader")]
        [HttpPost]
        public async Task<IActionResult> AddWorkoutHeader([FromBody] AddWorkoutHeaderRequest req)
        {
            return Ok(await _mediator.Send(req));
        }

        [Route("/getManyWorkoutHeader")]
        [HttpGet]
        public async Task<IActionResult> GetManyWorkoutHeader([FromQuery] GetManyWorkoutHeaderRequest req)
        {
            return Ok(await _mediator.Send(req));
        }
    }
}
