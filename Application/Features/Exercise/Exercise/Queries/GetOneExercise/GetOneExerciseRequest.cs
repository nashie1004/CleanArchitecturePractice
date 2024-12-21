using System;
using Application.Common;
using MediatR;

namespace Application.Features.Exercise.Exercise.Queries.GetOneExercise;

public class GetOneExerciseRequest : BaseRequest, IRequest<GetOneExerciseResponse>
{
    public long ExerciseId { get; set; }
}
