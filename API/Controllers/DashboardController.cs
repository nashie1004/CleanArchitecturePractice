using Application.Features.Audit.Queries.GetAllAudit;
using Application.Features.Dashboard.Queries.GetDashboard;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IMediator mediator_;

        public DashboardController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("getDashboard")]
        [HttpGet]
        public async Task<IActionResult> GetDashboard([FromQuery] GetDashboardRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
