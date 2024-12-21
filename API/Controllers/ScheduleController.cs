using Application.Features.Audit.Queries.GetAllAudit;
using Application.Features.Schedule.Queries.GetSchedule;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IMediator mediator_;

        public ScheduleController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("getSchedule")]
        [HttpGet]
        public async Task<IActionResult> GetSchedule([FromQuery] GetScheduleRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
