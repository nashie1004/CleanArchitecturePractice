using System;
using Application.Common;
using Application.DTOs;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetOne;

public class GetOneExerciseCategoryResponse : BaseResponse
{
    public ExerciseCategoryDTO ExerciseCategory { get; set; }
}
