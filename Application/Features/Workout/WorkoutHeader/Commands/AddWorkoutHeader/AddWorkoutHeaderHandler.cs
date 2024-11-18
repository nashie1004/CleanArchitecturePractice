using Application.Contracts.Infra.Repos;
using Domain.Entities;
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
                var workoutDetails = new List<WorkoutDetail>();
                foreach (var item in req.WorkoutHeader.WorkoutDetails)
                {
                    workoutDetails.Add(new WorkoutDetail()
                    {
                        Sets = item.Sets
                        ,Reps = item.Reps
                        ,ExerciseId = item.ExerciseId
                        ,Weight = item.Weight
                    });
                }

                await _workoutHeaderRepository.AddRecordAsync(new Domain.Entities.WorkoutHeader()
                {
                    Title = req.WorkoutHeader.Title,
                    Duration = req.WorkoutHeader.Duration,
                    WorkoutDetails = workoutDetails,
                });
                await _workoutHeaderRepository.SaveRecordAsync(ct);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
