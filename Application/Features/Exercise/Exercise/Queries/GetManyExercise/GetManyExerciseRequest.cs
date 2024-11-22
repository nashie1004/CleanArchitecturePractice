using Application.Common;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.Queries.GetManyExercise
{
    public class GetManyExerciseRequest : BaseRequestList, IRequest<GetManyExerciseResponse>
    {
        
    }
}
