using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Identity;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Infra.Repository;
using Infrastructure.Persistence.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repository.Exercise
{
    public class ExerciseCategoryRepository : BaseRepositoryPersistence<Domain.Entities.ExerciseCategory>, IExerciseCategoryRepository
    {
        public ExerciseCategoryRepository(MainContext ctx, IBaseRepositoryIdentityUserHttpContext httpContext) : base(ctx, httpContext) 
        {
            
        }
    }
}
