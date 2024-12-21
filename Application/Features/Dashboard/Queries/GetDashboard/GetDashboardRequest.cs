using System;
using Application.Common;
using MediatR;

namespace Application.Features.Dashboard.Queries.GetDashboard;

public class GetDashboardRequest : BaseRequest, IRequest<GetDashboardResponse>
{

}
