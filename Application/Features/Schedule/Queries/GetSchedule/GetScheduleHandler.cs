using System;
using MediatR;

namespace Application.Features.Schedule.Queries.GetSchedule;

public class GetScheduleHandler : IRequestHandler<GetScheduleRequest, GetScheduleResponse>
{
    public GetScheduleHandler()
    {
        
    }

    public async Task<GetScheduleResponse> Handle(GetScheduleRequest req, CancellationToken ct){
        var retVal = new GetScheduleResponse();
        try{

        } catch(Exception err){
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
