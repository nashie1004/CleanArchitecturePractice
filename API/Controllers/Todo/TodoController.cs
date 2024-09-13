using Application.Features.Todo.Queries.GetTodo;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Todo
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly IMediator mediator_;

        public TodoController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [HttpGet("GetTodoItem")]
        public async Task<IActionResult> GetTodoItem([FromQuery] GetTodoRequest request)
        {
            return Ok(await mediator_.Send(request));
        }
    }
}
