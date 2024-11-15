using Application.Features.Todo.Commands.AddTodo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditController : ControllerBase
    {
        private readonly IMediator mediator_;

        public AuditController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [HttpGet("/getMany")]
        public async Task<IActionResult> GetAllAudit([FromBody] AddTodoRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
