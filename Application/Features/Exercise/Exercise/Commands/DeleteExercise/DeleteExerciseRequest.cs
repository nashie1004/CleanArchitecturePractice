using System;
using Application.Common;
using Application.DTOs;
using MediatR;

namespace Application.Features.Exercise.Exercise.Commands.DeleteExercise;

public class DeleteExerciseRequest : BaseRequest, IRequest<DeleteExerciseResponse>
{
    public long ExerciseId { get; set; }
}
