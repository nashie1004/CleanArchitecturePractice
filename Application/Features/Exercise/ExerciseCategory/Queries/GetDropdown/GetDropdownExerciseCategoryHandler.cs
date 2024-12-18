using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetDropdown
{
    public class GetDropdownExerciseCategoryHandler : IRequestHandler<GetDropdownExerciseCategoryRequest, GetDropdownExerciseCategoryResponse>
    {
        private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
        private readonly IMapper _mapper;

        public GetDropdownExerciseCategoryHandler(
            IExerciseCategoryRepository exerciseCategoryRepository
            , IMapper mapper
            )
        {
            _mapper = mapper;
            _exerciseCategoryRepository = exerciseCategoryRepository;
        }

        public async Task<GetDropdownExerciseCategoryResponse> Handle(GetDropdownExerciseCategoryRequest request, CancellationToken ct)
        {
            var retVal = new GetDropdownExerciseCategoryResponse();

            try
            {
                var rawItems = await _exerciseCategoryRepository.GetAllRecordAsync();
                retVal.Items = _mapper.Map<List<ExerciseCategoryDropdownDTO>>(rawItems);
            }
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
