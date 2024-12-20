using Application.Contracts.Infra.Repos;
using Application.DTOs;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Workout.WorkoutHeader.Queries.GetManyWorkoutHeader
{
    public class GetManyWorkoutHeaderHandler : IRequestHandler<GetManyWorkoutHeaderRequest, GetManyWorkoutHeaderResponse>
    {
        private readonly IWorkoutHeaderRepository _workoutHeaderRepository;
        private readonly IMapper _mapper;

        public GetManyWorkoutHeaderHandler(
            IMapper mapper,
            IWorkoutHeaderRepository workoutHeaderRepository)
        {
            _workoutHeaderRepository = workoutHeaderRepository;
            _mapper = mapper;
        }

        public async Task<GetManyWorkoutHeaderResponse> Handle(GetManyWorkoutHeaderRequest req, CancellationToken ct)
        {
            var retVal = new GetManyWorkoutHeaderResponse();

            try
            {
                var rawItems = await _workoutHeaderRepository.GetAllRecordAsync(req.PageSize, req.PageNumber);
                retVal.Items = _mapper.Map<List<WorkoutHeaderDTO>>(rawItems);
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        } 
    }
}
