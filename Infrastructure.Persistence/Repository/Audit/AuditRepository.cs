using Application.Contracts.Infra.Todo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Audit
{
    public class AuditRepository : BaseRepositoryPersistence<Domain.Entities.Audit>, IAuditRepository
    {
        public AuditRepository(MainContext ctx) : base(ctx)
        {
            
        }
    }
}
