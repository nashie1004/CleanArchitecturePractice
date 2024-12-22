using Application.Contracts.Infra.Todo;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.Exercise.Commands.AddExercise
{
    public class AddExerciseHandler : IRequestHandler<AddExerciseRequest, AddExerciseResponse>
    {
        private readonly IExerciseRepository _exerciseRepository;
        private readonly IMapper _mapper;

        public AddExerciseHandler(
            IExerciseRepository exerciseRepository,
            IMapper mapper
            )
        {
            _mapper = mapper;
            _exerciseRepository = exerciseRepository;
        }

        public async Task<AddExerciseResponse> Handle(AddExerciseRequest req, CancellationToken ct)
        {
            var retVal = new AddExerciseResponse();

            try
            {
                var rawExercise = _mapper.Map<Domain.Entities.Exercise>(req.Exercise);

                var existing = await _exerciseRepository.GetRecordAsync(rawExercise.ExerciseId);
                // Update existing record
                if (existing != null){

                    existing.Name = rawExercise.Name;
                    existing.Description = rawExercise.Description;
                    existing.ImageUrl = rawExercise.ImageUrl;
                    existing.ExerciseCategoryId = rawExercise.ExerciseCategoryId;

                    retVal.RowsAffected = await _exerciseRepository.SaveRecordAsync(ct);
                    retVal.SuccessMessage = "Successfully updated record";
                    
                    return retVal;
                }

                // Add new record
                rawExercise.GeneratedBy = GeneratedBy.User;
                await _exerciseRepository.AddRecordAsync(rawExercise);

                retVal.RowsAffected = await _exerciseRepository.SaveRecordAsync(ct);
                retVal.SuccessMessage = "Successfully created. Go to the exercise list to see the newly added category.";
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
