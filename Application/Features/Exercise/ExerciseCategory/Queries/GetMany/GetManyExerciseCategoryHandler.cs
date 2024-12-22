using Application.Contracts.Infrastructure.Identity;
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
        private readonly IBaseRepositoryIdentityUserHttpContext _userHttpContext;

        public GetManyExerciseCategoryHandler(
            IExerciseCategoryRepository exerciseCategoryRepository
            ,IMapper mapper
            ,IBaseRepositoryIdentityUserHttpContext baseRepositoryIdentityUserHttpContext
            )
        {
            _userHttpContext = baseRepositoryIdentityUserHttpContext;
            _exerciseCategoryRepository = exerciseCategoryRepository;
            _mapper = mapper;
        }

        public async Task<GetManyExerciseCategoryResponse> Handle(GetManyExerciseCategoryRequest req, CancellationToken ct)
        {
            var retVal = new GetManyExerciseCategoryResponse();

            try
            {
                var rawItems = await _exerciseCategoryRepository
                    .GetAllRecordAsync(req.PageSize, req.PageNumber);
                
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
