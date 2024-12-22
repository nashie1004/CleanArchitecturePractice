using System;
using Application.Contracts.Infra.Todo;
using AutoMapper;
using Domain.Enums;
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
            var record = await _exerciseRepository.GetRecordByPropertyAsync(i => i.ExerciseId == req.ExerciseId);

            if (record.GeneratedBy == GeneratedBy.System){
                retVal.ValidationErrors.Add("Record can't be deleted as it is system-generated");
                return retVal;
            }

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
