using Application.Contracts.Infra.Repos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutHeader.Commands.AddWorkoutHeader
{
    public class AddWorkoutHeaderHandler : IRequestHandler<AddWorkoutHeaderRequest, AddWorkoutHeaderResponse>
    {
        private readonly IWorkoutHeaderRepository _workoutHeaderRepository;

        public AddWorkoutHeaderHandler(IWorkoutHeaderRepository workoutHeaderRepository)
        {
            _workoutHeaderRepository = workoutHeaderRepository;
        }

        public async Task<AddWorkoutHeaderResponse> Handle(AddWorkoutHeaderRequest req, CancellationToken ct)
        {
            var retVal = new AddWorkoutHeaderResponse();

            try
            {

            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
