using Application.DTOs;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutHeader.Commands.AddWorkoutHeader
{
    public class AddWorkoutHeaderRequest : IRequest<AddWorkoutHeaderResponse>
    {
        public WorkoutHeaderDTO WorkoutHeader { get; set; }
    }
}
