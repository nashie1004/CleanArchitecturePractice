using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Persistence.Repository;
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

        public AddExerciseCategoryHandler(IExerciseCategoryRepository exerciseCategoryRepository)
        {
            _exerciseCategoryRepository = exerciseCategoryRepository;
        }

        public async Task<AddExerciseCategoryResponse> Handle(AddExerciseCategoryRequest req, CancellationToken ct)
        {
            var retVal = new AddExerciseCategoryResponse();

            try
            {
                await _exerciseCategoryRepository.AddRecordAsync(new Domain.Entities.ExerciseCategory()
                {
                    Name = req.Name,
                    Description = req.Description,
                    GeneratedBy = GeneratedBy.User,
                });

                retVal.RowsAffected = await _exerciseCategoryRepository.SaveRecordAsync(ct);
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
