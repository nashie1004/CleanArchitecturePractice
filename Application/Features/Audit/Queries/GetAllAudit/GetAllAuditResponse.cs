﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common;
using Domain.Entities;

namespace Application.Features.Audit.Queries.GetAllAudit
{
    public class GetAllAuditResponse : BaseResponseList<Domain.Entities.Audit>
    {
    }
}
