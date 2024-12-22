using System;
using Application.Contracts.Infrastructure.Persistence.Repository;
using MediatR;

namespace Application.Features.Exercise.ExerciseCategory.Commands.DeleteExerciseCategory;

public class DeleteExerciseCategoryHandler : IRequestHandler<DeleteExerciseCategoryRequest, DeleteExerciseCategoryResponse>
{
    private readonly IExerciseCategoryRepository _exerciseCategoryRepository;

    public DeleteExerciseCategoryHandler(
        IExerciseCategoryRepository exerciseCategoryRepository
    )
    {
        _exerciseCategoryRepository = exerciseCategoryRepository;
    }

    public async Task<DeleteExerciseCategoryResponse> Handle(DeleteExerciseCategoryRequest req, CancellationToken ct){
        var retVal = new DeleteExerciseCategoryResponse();
        
        try{
            await _exerciseCategoryRepository.DeleteRecordAsync(req.ExerciseCategoryId);
            retVal.RowsAffected = await _exerciseCategoryRepository.SaveRecordAsync(ct);
            retVal.SuccessMessage = "Successfully removed record";
        } 
        catch (Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
