using System;
using Application.Contracts.Infra.Repos;
using Application.DTOs;
using AutoMapper;
using MediatR;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetOneWorkoutHeader;

public class GetOneWorkoutHeaderHandler : IRequestHandler<GetOneWorkoutHeaderRequest, GetOneWorkoutHeaderResponse>
{
    private readonly IWorkoutHeaderRepository _workoutHeaderRepository;
    private readonly IWorkoutDetailRepository _workoutDetailRepository;
    private readonly IMapper _mapper;

    public GetOneWorkoutHeaderHandler(
        IMapper mapper,
        IWorkoutHeaderRepository workoutHeader,
        IWorkoutDetailRepository workoutDetailRepository
    )
    {
        _mapper = mapper;
        _workoutDetailRepository = workoutDetailRepository;
        _workoutHeaderRepository = workoutHeader;
    }

    public async Task<GetOneWorkoutHeaderResponse> Handle(GetOneWorkoutHeaderRequest req, CancellationToken ct)
    {
        var retVal = new GetOneWorkoutHeaderResponse();
        
        try
        {
            var rawHeader = await _workoutHeaderRepository.GetRecordAsync(req.WorkoutHeaderId);
            retVal.WorkoutHeader = _mapper.Map<WorkoutHeaderDTO>(rawHeader);

            var rawDetails = await _workoutDetailRepository
                .GetListByPropertyAsync(i => i.WorkoutHeaderId == rawHeader.WorkoutHeaderId);
            retVal.WorkoutHeader.WorkoutDetails = _mapper.Map<List<WorkoutDetailDTO>>(rawDetails);
        } 
        catch (Exception ex)
        {
            retVal.ValidationErrors.Add(ex.Message);
        }

        return retVal;
    }
}
