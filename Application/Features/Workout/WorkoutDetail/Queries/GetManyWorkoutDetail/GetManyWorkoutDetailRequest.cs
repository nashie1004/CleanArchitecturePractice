using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutDetail.Queries.GetManyWorkoutDetail
{
    public class GetManyWorkoutDetailRequest : BaseRequestList, IRequest<GetManyWorkoutDetailResponse>
    {
    }
}
