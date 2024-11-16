using Application.Contracts.Infra.Todo;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.Commands.AddExercise
{
    public class AddExerciseHandler : IRequestHandler<AddExerciseRequest, AddExerciseResponse>
    {
        private readonly IExerciseRepository _exerciseRepository;

        public AddExerciseHandler(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }

        public async Task<AddExerciseResponse> Handle(AddExerciseRequest req, CancellationToken ct)
        {
            var retVal = new AddExerciseResponse();

            try
            {
                await _exerciseRepository.AddRecordAsync(new Domain.Entities.Exercise()
                {
                    Description = req.Description,
                    Name = req.Name,
                    ImageUrl = req.ImageUrl,
                });

                retVal.RowsAffected = await _exerciseRepository.SaveRecordAsync(ct);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
