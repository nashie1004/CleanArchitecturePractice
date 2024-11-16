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
        public string Title { get; set; }
        public decimal Duration { get; set; }
        public List<WorkoutDetail> WorkoutDetails { get; set; }
    }
}
