using System;
using Application.Common;
using Application.DTOs;

namespace Application.Features.Exercise.Exercise.Queries.GetOneExercise;

public class GetOneExerciseResponse : BaseResponse
{
    public ExerciseDTO Exercise { get; set; }
}
