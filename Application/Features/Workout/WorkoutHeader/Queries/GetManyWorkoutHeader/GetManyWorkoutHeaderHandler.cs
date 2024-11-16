using Application.Contracts.Infra.Repos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetManyWorkoutHeader
{
    public class GetManyWorkoutHeaderHandler : IRequestHandler<GetManyWorkoutHeaderRequest, GetManyWorkoutHeaderResponse>
    {
        private readonly IWorkoutHeaderRepository _workoutHeaderRepository;

        public GetManyWorkoutHeaderHandler(IWorkoutHeaderRepository workoutHeaderRepository)
        {
            _workoutHeaderRepository = workoutHeaderRepository;
        }

        public async Task<GetManyWorkoutHeaderResponse> Handle(GetManyWorkoutHeaderRequest req, CancellationToken ct)
        {
            var retVal = new GetManyWorkoutHeaderResponse();

            try
            {
                retVal.Items = await _workoutHeaderRepository.GetAllRecordAsync(req.PageSize, req.PageNumber);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        } 
    }
}
