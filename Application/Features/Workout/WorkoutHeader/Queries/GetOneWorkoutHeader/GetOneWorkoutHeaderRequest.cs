using System;
using MediatR;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetOneWorkoutHeader;

public class GetOneWorkoutHeaderRequest : IRequest<GetOneWorkoutHeaderResponse>
{
    public long WorkoutHeaderId { get; set; }
}
