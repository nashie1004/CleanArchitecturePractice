using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetMany
{
    public class GetManyExerciseCategoryHandler : IRequestHandler<GetManyExerciseCategoryRequest, GetManyExerciseCategoryResponse>
    {
        private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
        private readonly IMapper _mapper;

        public GetManyExerciseCategoryHandler(
            IExerciseCategoryRepository exerciseCategoryRepository
            ,IMapper mapper
            )
        {
            _exerciseCategoryRepository = exerciseCategoryRepository;
            _mapper = mapper;
        }

        public async Task<GetManyExerciseCategoryResponse> Handle(GetManyExerciseCategoryRequest req, CancellationToken ct)
        {
            var retVal = new GetManyExerciseCategoryResponse();

            try
            {
                var rawItems = await _exerciseCategoryRepository.GetAllRecordAsync(req.PageSize, req.PageNumber);
                retVal.Items = _mapper.Map<List<ExerciseCategoryDTO>>(rawItems);
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
