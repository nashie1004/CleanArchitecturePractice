using System;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using AutoMapper;
using MediatR;
using MediatR.Pipeline;

namespace Application.Features.Exercise.ExerciseCategory.Queries.GetOne;

public class GetOneExerciseCategoryHandler : IRequestHandler<GetOneExerciseCategoryRequest, GetOneExerciseCategoryResponse>
{
    private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
    private readonly IMapper _mapper;

    public GetOneExerciseCategoryHandler(
        IExerciseCategoryRepository exerciseCategoryRepository,
        IMapper mapper
    )
    {
        _mapper = mapper;
        _exerciseCategoryRepository = exerciseCategoryRepository;
    }

    public async Task<GetOneExerciseCategoryResponse> Handle(GetOneExerciseCategoryRequest req, CancellationToken ct){
        var retVal = new GetOneExerciseCategoryResponse();

        try
        {
            var rawItem = await _exerciseCategoryRepository.GetRecordAsync(req.ExerciseCategoryId);
            retVal.ExerciseCategory = _mapper.Map<ExerciseCategoryDTO>(rawItem);
        } 
        catch (Exception err)
        {
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
