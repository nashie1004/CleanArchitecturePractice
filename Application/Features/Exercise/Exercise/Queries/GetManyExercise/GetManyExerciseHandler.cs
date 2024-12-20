using Application.Contracts.Infra.Todo;
using Application.DTOs;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public GetManyExerciseHandler(
            IMapper mapper,
            IExerciseRepository exerciseRepository)
        {
            _mapper = mapper;
            _repository = exerciseRepository;
        }

        public async Task<GetManyExerciseResponse> Handle(GetManyExerciseRequest req, CancellationToken ct)
        {
            var retVal = new GetManyExerciseResponse();

            try
            {
                var rawItems = await _repository.GetAllRecordAsync(req.PageSize, req.PageNumber);
                retVal.Items = _mapper.Map<List<ExerciseDTO>>(rawItems);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
