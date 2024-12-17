using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
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
        private readonly IBaseRepositoryIdentityUserHttpContext _userHttpContext;

        public GetAllAuditHandler(IAuditRepository auditRepository, IBaseRepositoryIdentityUserHttpContext userHttpContext)
        {
            _auditRepository = auditRepository;
            _userHttpContext = userHttpContext;
        }

        public async Task<GetAllAuditResponse> Handle(GetAllAuditRequest req, CancellationToken cancellationToken)
        {
            var retVal = new GetAllAuditResponse();

            try
            {
                long userId = _userHttpContext.GetUserId();
                retVal.Items = await _auditRepository
                    .GetAllRecordAsync(
                        req.PageSize
                        , req.PageNumber 
                        //, i => i.CreatedBy == userId
                    );
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
