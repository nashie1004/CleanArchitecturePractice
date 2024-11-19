using Application.Contracts.Infra.Repos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutDetail.Queries.GetManyWorkoutDetail
{
    public class GetManyWorkoutDetailHandler : IRequestHandler<GetManyWorkoutDetailRequest, GetManyWorkoutDetailResponse>
    {
        private readonly IWorkoutDetailRepository _workoutDetailRepository;

        public GetManyWorkoutDetailHandler(IWorkoutDetailRepository workoutDetailRepository)
        {
            _workoutDetailRepository = workoutDetailRepository;
        }

        public async Task<GetManyWorkoutDetailResponse> Handle(GetManyWorkoutDetailRequest req, CancellationToken ct)
        {
            var retVal = new GetManyWorkoutDetailResponse();

            try
            {
                retVal.Items = await _workoutDetailRepository.GetAllRecordAsync(req.PageSize, req.PageNumber);
            }
            catch (Exception ex) 
            { 
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
