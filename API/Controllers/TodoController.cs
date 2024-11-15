﻿using Application.Features.Todo.Commands.AddTodo;
using Application.Features.Todo.Queries.GetAllTodo;
using Application.Features.Todo.Queries.GetTodo;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly IMediator mediator_;

        public TodoController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("/add")]
        [HttpPost]
        public async Task<IActionResult> AddTodo([FromBody] AddTodoRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("/get")]
        [HttpGet]
        public async Task<IActionResult> GetTodo([FromQuery] GetTodoRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

        [Route("/getMany")]
        [HttpGet]
        public async Task<IActionResult> GetTodo([FromQuery] GetAllTodoRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

    }
}
