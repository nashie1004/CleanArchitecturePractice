using System;
using Application.Common;
using MediatR;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetOne;

public class GetOneExerciseCategoryRequest : BaseRequest, IRequest<GetOneExerciseCategoryResponse>
{
    public long ExerciseCategoryId { get; set; }
}
