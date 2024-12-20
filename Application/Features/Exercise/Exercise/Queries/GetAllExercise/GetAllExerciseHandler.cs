using System;
using Application.Contracts.Infra.Todo;
using Application.DTOs;
using AutoMapper;
using MediatR;

namespace Application.Features.Exercise.Exercise.Queries.GetAllExercise;

public class GetAllExerciseHandler : IRequestHandler<GetAllExerciseRequest, GetAllExerciseResponse>
{
    private IMapper _mapper;
    private IExerciseRepository _exerciseRepository;

    public GetAllExerciseHandler(
        IExerciseRepository exerciseRepository,
        IMapper mapper)
    {
        _mapper = mapper;
        _exerciseRepository = exerciseRepository;
    }

    public async Task<GetAllExerciseResponse> Handle(GetAllExerciseRequest req, CancellationToken ct)
    {
        var retVal = new GetAllExerciseResponse();
        try
        {
            var rawItems = await _exerciseRepository.GetAllRecordAsync();
            retVal.Items = _mapper.Map<List<ExerciseDTO>>(rawItems);
        }   
        catch(Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }
        return retVal;
    }
}
