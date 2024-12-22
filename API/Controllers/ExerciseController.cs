using Application.Features.Exercise.Exercise.Commands.AddExercise;
using Application.Features.Exercise.Exercise.Commands.DeleteExercise;
using Application.Features.Exercise.Exercise.Queries.GetAllExercise;
using Application.Features.Exercise.Exercise.Queries.GetOneExercise;
using Application.Features.Exercise.Queries.GetManyExercise;
using Application.Features.Todo.Commands.AddTodo;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IMediator mediator_;

        public ExerciseController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("addExercise")]
        [HttpPost]
        public async Task<IActionResult> AddExercise([FromBody] AddExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("getManyExercise")]
        [HttpGet]
        public async Task<IActionResult> GetManyExercise([FromQuery] GetManyExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
        
        [Route("getOne")]
        [HttpGet]
        public async Task<IActionResult> GetOne([FromQuery] GetOneExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
        
        [Route("getDropdown")]
        [HttpGet]
        public async Task<IActionResult> GetDropdown([FromQuery] GetAllExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
        
        [Route("deleteOne")]
        [HttpDelete]
        public async Task<IActionResult> DeleteOne([FromQuery] DeleteExerciseRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
