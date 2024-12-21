using System;
using Application.Contracts.Infra.Todo;
using Application.DTOs;
using AutoMapper;
using MediatR;

namespace Application.Features.Exercise.Exercise.Queries.GetOneExercise;

public class GetOneExerciseHandler : IRequestHandler<GetOneExerciseRequest, GetOneExerciseResponse>
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMapper _mapper;

    public GetOneExerciseHandler(
        IMapper mapper,
        IExerciseRepository exerciseRepository
    )
    {
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
    }

    public async Task<GetOneExerciseResponse> Handle(GetOneExerciseRequest req, CancellationToken ct){
        var retVal = new GetOneExerciseResponse();
        
        try{
            var rawItem = await _exerciseRepository.GetRecordAsync(req.ExerciseId);
            retVal.Exercise = _mapper.Map<ExerciseDTO>(rawItem);
        } catch (Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
