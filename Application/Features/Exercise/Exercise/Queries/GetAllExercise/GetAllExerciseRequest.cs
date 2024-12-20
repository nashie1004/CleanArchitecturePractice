using System;
using Application.Common;
using MediatR;

namespace Application.Features.Exercise.Exercise.Queries.GetAllExercise;

public class GetAllExerciseRequest : BaseRequestList, IRequest<GetAllExerciseResponse>
{

}
