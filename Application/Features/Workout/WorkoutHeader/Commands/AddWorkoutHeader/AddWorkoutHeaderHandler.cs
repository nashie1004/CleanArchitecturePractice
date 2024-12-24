using Application.Contracts.Infra.Repos;
using Application.DTOs;
using AutoMapper;
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
        private readonly IWorkoutDetailRepository _workoutDetailRepository;
        private readonly IMapper _mapper;

        public AddWorkoutHeaderHandler(
            IMapper mapper,
            IWorkoutHeaderRepository workoutHeaderRepository,
            IWorkoutDetailRepository workoutDetailRepository
            )
        {
            _mapper = mapper;
            _workoutHeaderRepository = workoutHeaderRepository;
            _workoutDetailRepository = workoutDetailRepository;
        }

        public async Task<AddWorkoutHeaderResponse> Handle(AddWorkoutHeaderRequest req, CancellationToken ct)
        {
            var retVal = new AddWorkoutHeaderResponse();
            try
            {
                var existing = await _workoutHeaderRepository
                    .GetRecordByPropertyAsync(i => i.WorkoutHeaderId == req.WorkoutHeader.WorkoutHeaderId);

                if (existing != null){
                    // Update header
                    existing.Title = req.WorkoutHeader.Title;
                    existing.Notes = req.WorkoutHeader.Notes;
                    existing.StartDateTime = req.WorkoutHeader.StartDateTime;
                    existing.EndDateTime = req.WorkoutHeader.EndDateTime;

                    // Get new workout details and add them 
                    var newWorkoutDetails = _mapper
                        .Map<List<Domain.Entities.WorkoutDetail>>(req.WorkoutHeader.WorkoutDetails)
                        .Where(i => i.WorkoutDetailId <= 0)
                        .ToList();

                    newWorkoutDetails.ForEach(i => i.WorkoutHeaderId = existing.WorkoutHeaderId);

                    foreach (var item in newWorkoutDetails)
                    {
                        await _workoutDetailRepository.AddRecordAsync(item);
                    }

                    // Save
                    var headerRowsAffected = await _workoutHeaderRepository.SaveRecordAsync(ct);
                    var detailRowsAffected = await _workoutDetailRepository.SaveRecordAsync(ct);

                    retVal.RowsAffected = headerRowsAffected + detailRowsAffected;
                    retVal.ValidationErrors.Add($"Successfully updated workout record. {retVal.RowsAffected} row(s) affected.");
                    return retVal;
                }

                var workout = _mapper.Map<Domain.Entities.WorkoutHeader>(req.WorkoutHeader);
                await _workoutHeaderRepository.AddRecordAsync(workout);
                retVal.RowsAffected = await _workoutHeaderRepository.SaveRecordAsync(ct);
                retVal.SuccessMessage = $"Successfully created workout record. {retVal.RowsAffected} row(s) affected. Go to the workout list to view the newly added record.";
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
