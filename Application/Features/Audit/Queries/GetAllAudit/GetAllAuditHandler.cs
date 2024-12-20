using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.DTOs;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Application.Features.Audit.Queries.GetAllAudit
{
    public class GetAllAuditHandler : IRequestHandler<GetAllAuditRequest, GetAllAuditResponse>
    {
        private readonly IAuditRepository _auditRepository;
        private readonly IBaseRepositoryIdentityUserHttpContext _userHttpContext;
        private readonly IMapper _mapper;

        public GetAllAuditHandler(
            IMapper mapper
            , IAuditRepository auditRepository
            , IBaseRepositoryIdentityUserHttpContext userHttpContext)
        {
            _mapper = mapper;
            _auditRepository = auditRepository;
            _userHttpContext = userHttpContext;
        }

        public async Task<GetAllAuditResponse> Handle(GetAllAuditRequest req, CancellationToken cancellationToken)
        {
            var retVal = new GetAllAuditResponse();

            try
            {
                long userId = _userHttpContext.GetUserId();
                var rawItems = await _auditRepository
                    .GetAllRecordAsync(
                        req.PageSize, req.PageNumber, i => i.CreatedBy == userId
                    );
                retVal.Items = _mapper.Map<List<AuditDTO>>(rawItems);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
