using Application.Features.Todo.Commands.AddTodo;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly IMediator mediator_;

        public TodoController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("/addTodo")]
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] AddTodoRequest req)
        {
            return Ok(await mediator_.Send(req));
        }


    }
}
