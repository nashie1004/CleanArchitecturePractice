﻿using Application.Contracts.Infra.Todo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Exercise
{
    public class ExerciseRepository : BaseRepositoryPersistence<Domain.Entities.Exercise>, IExerciseRepository
    {
        public ExerciseRepository(MainContext ctx) : base(ctx)
        {
            
        }
    }
}
