﻿using Application.Contracts.Infra.Repos;
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
        private readonly IMapper _mapper;

        public AddWorkoutHeaderHandler(
            IMapper mapper,
            IWorkoutHeaderRepository workoutHeaderRepository
            )
        {
            _mapper = mapper;
            _workoutHeaderRepository = workoutHeaderRepository;
        }

        public async Task<AddWorkoutHeaderResponse> Handle(AddWorkoutHeaderRequest req, CancellationToken ct)
        {
            var retVal = new AddWorkoutHeaderResponse();
            try
            {
                if (!string.IsNullOrEmpty(req.WorkoutHeader.Title)){
                    var existing = await _workoutHeaderRepository
                    .GetRecordByPropertyAsync(i => i.Title == req.WorkoutHeader.Title);

                    if (existing != null){
                        retVal.ValidationErrors.Add("Existing workout title/name");
                        return retVal;
                    }
                }

                var workout = _mapper.Map<Domain.Entities.WorkoutHeader>(req.WorkoutHeader);
                await _workoutHeaderRepository.AddRecordAsync(workout);
                retVal.RowsAffected = await _workoutHeaderRepository.SaveRecordAsync(ct);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
