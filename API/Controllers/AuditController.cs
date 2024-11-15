﻿using Application.Features.Audit.Queries.GetAllAudit;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AuditController : ControllerBase
    {
        private readonly IMediator mediator_;

        public AuditController(IMediator mediator)
        {
            mediator_ = mediator;
        }

        [Route("/getManyAudit")]
        [HttpGet]
        public async Task<IActionResult> GetMany([FromQuery] GetAllAuditRequest req)
        {
            return Ok(await mediator_.Send(req));
        }

    }
}
