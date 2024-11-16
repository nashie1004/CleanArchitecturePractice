using Application.Contracts.Infra.Todo;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.Queries.GetManyExercise
{
    public class GetManyExerciseHandler : IRequestHandler<GetManyExerciseRequest, GetManyExerciseResponse>
    {
        private readonly IExerciseRepository _repository;

        public GetManyExerciseHandler(IExerciseRepository exerciseRepository)
        {
            _repository = exerciseRepository;
        }

        public async Task<GetManyExerciseResponse> Handle(GetManyExerciseRequest req, CancellationToken ct)
        {
            var retVal = new GetManyExerciseResponse();

            try
            {
                retVal.Items = await _repository.GetAllRecordAsync(req.PageSize, req.PageNumber);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
