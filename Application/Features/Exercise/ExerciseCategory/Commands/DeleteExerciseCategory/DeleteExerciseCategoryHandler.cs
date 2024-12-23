using System;
using Application.Contracts.Infra.Todo;
using Application.Contracts.Infrastructure.Persistence.Repository;
using Application.DTOs;
using Domain.Enums;
using MediatR;

namespace Application.Features.Exercise.ExerciseCategory.Commands.DeleteExerciseCategory;

public class DeleteExerciseCategoryHandler : IRequestHandler<DeleteExerciseCategoryRequest, DeleteExerciseCategoryResponse>
{
    private readonly IExerciseCategoryRepository _exerciseCategoryRepository;
    private readonly IExerciseRepository _exerciseRepository;

    public DeleteExerciseCategoryHandler(
        IExerciseCategoryRepository exerciseCategoryRepository,
        IExerciseRepository exerciseRepository
    )
    {
        _exerciseCategoryRepository = exerciseCategoryRepository;
        _exerciseRepository = exerciseRepository;
    }

    public async Task<DeleteExerciseCategoryResponse> Handle(DeleteExerciseCategoryRequest req, CancellationToken ct){
        var retVal = new DeleteExerciseCategoryResponse();
        
        try{
            var used = await _exerciseRepository.GetRecordByPropertyAsync(i => i.ExerciseCategoryId == req.ExerciseCategoryId);

            if (used != null){

                if (used.GeneratedBy == GeneratedBy.System){
                    retVal.ValidationErrors.Add("Record can't be deleted as it is system-generated");
                    return retVal;
                }

                retVal.ValidationErrors.Add("Record can't be deleted as it is used");
                return retVal;
            }

            await _exerciseCategoryRepository.DeleteRecordAsync(req.ExerciseCategoryId);
            retVal.RowsAffected = await _exerciseCategoryRepository.SaveRecordAsync(ct);
            retVal.SuccessMessage = $"Successfully deleted record. ${retVal.RowsAffected} row(s) affected.";
        } 
        catch (Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
