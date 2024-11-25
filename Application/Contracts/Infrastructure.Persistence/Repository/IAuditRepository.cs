﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infra.Todo
{
    public interface IAuditRepository : IBaseRepositoryPersistence<Audit>
    {
        Task<int> SaveRecordNoAuditAsync();
    }
}
