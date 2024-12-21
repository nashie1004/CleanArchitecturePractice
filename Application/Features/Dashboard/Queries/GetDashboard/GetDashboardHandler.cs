using System;
using MediatR;

namespace Application.Features.Dashboard.Queries.GetDashboard;

public class GetDashboardHandler : IRequestHandler<GetDashboardRequest, GetDashboardResponse>
{
    public GetDashboardHandler()
    {
        
    }

    public async Task<GetDashboardResponse> Handle(GetDashboardRequest req, CancellationToken ct)
    {
        var retVal = new GetDashboardResponse();
        
        try{

        } catch(Exception err)
        {
            retVal.ValidationErrors.Add(err.Message);
        }

        return retVal;
    }
}
