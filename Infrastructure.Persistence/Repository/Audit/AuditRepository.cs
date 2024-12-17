using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Infrastructure.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Audit
{
    public class AuditRepository : BaseRepositoryPersistence<Domain.Entities.Audit>, IAuditRepository
    {
        private readonly MainContext _context;

        public AuditRepository(MainContext ctx, IBaseRepositoryIdentityUserHttpContext httpContext) : base(ctx, httpContext)
        {
            _context = ctx;
        }

        public async Task<int> SaveRecordNoAuditAsync()
        {
            return await _context.SaveChangesAsync();   
        }
    }
}
