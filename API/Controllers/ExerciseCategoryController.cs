using Application.Features.Exercise.Exercise.Commands.AddExercise;
using Application.Features.Exercise.ExerciseCategory.Commands.Add;
using Application.Features.Exercise.ExerciseCategory.Queries.GetMany;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseCategoryController : ControllerBase
    {
        private readonly IMediator mediator_;

        public ExerciseCategoryController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("addExerciseCategory")]
        [HttpPost]
        public async Task<IActionResult> AddExerciseCategory([FromBody] AddExerciseCategoryRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("getMany")]
        [HttpGet]
        public async Task<IActionResult> GetMany([FromQuery] GetManyExerciseCategoryRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("getDropdown")]
        [HttpGet]
        public async Task<IActionResult> GetDropdown([FromQuery] GetManyExerciseCategoryRequest req)
        {
            return Ok(await mediator_.Send(req));
        }
    }
}
