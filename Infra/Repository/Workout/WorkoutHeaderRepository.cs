﻿using Application.Contracts.Infra.Repos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Workout
{
    public class WorkoutHeaderRepository : BaseRepository<WorkoutHeader>, IWorkoutHeaderRepository
    {
        public WorkoutHeaderRepository(MainContext ctx) : base(ctx)
        {
            
        }
    }
}
