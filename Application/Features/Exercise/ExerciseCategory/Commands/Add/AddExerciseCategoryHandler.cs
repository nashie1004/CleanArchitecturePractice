using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Persistence.Repository;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.ExerciseCategory.Commands.Add
{
    public class AddExerciseCategoryHandler : IRequestHandler<AddExerciseCategoryRequest, AddExerciseCategoryResponse>
    {
        private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
        private readonly IMapper _mapper;

        public AddExerciseCategoryHandler(
            IExerciseCategoryRepository exerciseCategoryRepository,
            IMapper mapper
            )
        {
            _mapper = mapper;
            _exerciseCategoryRepository = exerciseCategoryRepository;
        }

        public async Task<AddExerciseCategoryResponse> Handle(AddExerciseCategoryRequest req, CancellationToken ct)
        {
            var retVal = new AddExerciseCategoryResponse();

            try
            {
                var rawExerciseCategory = _mapper.Map<Domain.Entities.ExerciseCategory>(req.ExerciseCategory);
                
                var existing = await _exerciseCategoryRepository.GetRecordAsync(rawExerciseCategory.ExerciseCategoryId); 
                
                // Update existing
                if (existing != null){

                    existing.Name = rawExerciseCategory.Name;
                    existing.Description = rawExerciseCategory.Description;

                    retVal.RowsAffected = await _exerciseCategoryRepository.SaveRecordAsync(ct);
                    retVal.SuccessMessage = "Successfully updated record";

                    return retVal;
                }

                // Add new record
                rawExerciseCategory.GeneratedBy = GeneratedBy.User;

                await _exerciseCategoryRepository.AddRecordAsync(rawExerciseCategory);

                retVal.RowsAffected = await _exerciseCategoryRepository.SaveRecordAsync(ct);
                retVal.SuccessMessage = "Successfully created. Go to category list to see newly added category.";
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
