using System;
using Application.Common;
using Application.DTOs;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetOneWorkoutHeader;

public class GetOneWorkoutHeaderResponse : BaseResponse
{
    public WorkoutHeaderDTO WorkoutHeader { get; set; }
}
