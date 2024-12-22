using System;
using Application.Contracts.Infra.Todo;
using AutoMapper;
using MediatR;

namespace Application.Features.Exercise.Exercise.Commands.DeleteExercise;

public class DeleteExerciseHandler : IRequestHandler<DeleteExerciseRequest, DeleteExerciseResponse>
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IMapper _mapper;

    public DeleteExerciseHandler(
        IExerciseRepository exerciseRepository,
        IMapper mapper
    )
    {
        _exerciseRepository = exerciseRepository;
        _mapper = mapper;
    }

    public async Task<DeleteExerciseResponse> Handle(DeleteExerciseRequest req, CancellationToken ct){
        var retVal = new DeleteExerciseResponse();
        
        try{
            await _exerciseRepository.DeleteRecordAsync(req.ExerciseId);
            retVal.RowsAffected = await _exerciseRepository.SaveRecordAsync(ct);
            retVal.SuccessMessage = "Successfully deleted record";
        } 
        catch (Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
