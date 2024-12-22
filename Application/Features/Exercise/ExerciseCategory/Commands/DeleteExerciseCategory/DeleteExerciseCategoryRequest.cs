using System;
using Application.Common;
using MediatR;

namespace Application.Features.Exercise.ExerciseCategory.Commands.DeleteExerciseCategory;

public class DeleteExerciseCategoryRequest : BaseRequest, IRequest<DeleteExerciseCategoryResponse>
{
    public long ExerciseCategoryId { get; set; }
}
