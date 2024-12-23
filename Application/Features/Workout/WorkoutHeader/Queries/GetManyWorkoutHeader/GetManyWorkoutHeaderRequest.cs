﻿using Application.Common;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetManyWorkoutHeader
{
    public class GetManyWorkoutHeaderRequest : BaseRequestList, IRequest<GetManyWorkoutHeaderResponse>
    {
    }
}
