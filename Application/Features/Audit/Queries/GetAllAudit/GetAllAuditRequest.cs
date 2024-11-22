using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common;

namespace Application.Features.Audit.Queries.GetAllAudit
{
    public class GetAllAuditRequest : BaseRequestList, IRequest<GetAllAuditResponse>
    {
    }
}
