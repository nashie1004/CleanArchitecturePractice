using Application.Features.Exercise.Exercise.Commands.AddExercise;
using Application.Features.Exercise.Queries.GetManyExercise;
using Application.Features.Todo.Commands.AddTodo;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IMediator mediator_;

        public ExerciseController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("/addExercise")]
        [HttpPost]
        public async Task<IActionResult> AddExercise([FromBody] AddExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("/getManyExercise")]
        [HttpGet]
        public async Task<IActionResult> GetManyExercise([FromQuery] GetManyExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
