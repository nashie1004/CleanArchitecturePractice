using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Persistence.Repository;
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
        private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
        private readonly IMapper _mapper;

        public GetManyExerciseHandler(
            IMapper mapper,
            IExerciseRepository exerciseRepository,
            IExerciseCategoryRepository exerciseCategoryRepository
            )
        {
            _exerciseCategoryRepository = exerciseCategoryRepository;
            _mapper = mapper;
            _repository = exerciseRepository;
        }

        public async Task<GetManyExerciseResponse> Handle(GetManyExerciseRequest req, CancellationToken ct)
        {
            var retVal = new GetManyExerciseResponse();

            try
            {
                var rawItems = await _repository.GetAllRecordAsync(req.PageSize, req.PageNumber);
                var exercises = _mapper.Map<List<ExerciseDTO>>(rawItems);

                foreach(var exercise in exercises){
                    exercise.ExerciseCategoryName = (await _exerciseCategoryRepository.GetRecordAsync(exercise.ExerciseCategoryId)).Name;
                }

                retVal.Items = exercises;
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
