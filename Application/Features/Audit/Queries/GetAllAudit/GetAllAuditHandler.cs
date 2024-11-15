using Application.Contracts.Infra.Todo;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Audit.Queries.GetAllAudit
{
    public class GetAllAuditHandler : IRequestHandler<GetAllAuditRequest, GetAllAuditResponse>
    {
        private readonly IAuditRepository _auditRepository;

        public GetAllAuditHandler(IAuditRepository auditRepository)
        {
            _auditRepository = auditRepository;

        }

        public async Task<GetAllAuditResponse> Handle(GetAllAuditRequest req, CancellationToken cancellationToken)
        {
            var retVal = new GetAllAuditResponse();

            try
            {
                retVal.Items = await _auditRepository.GetAllRecordAsync(req.PageSize, req.PageNumber);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
