using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetTodo
{
    public class GetTodoHandler : IRequestHandler<GetTodoRequest, GetTodoResponse>
    {
        public GetTodoHandler()
        {
            
        }

        public async Task<GetTodoResponse> Handle(GetTodoRequest request, CancellationToken cancellationToken)
        {
            var retVal = new GetTodoResponse();
            
            try
            {

            } 
            catch (Exception ex)
            {

            }

            return retVal;
        }
    }
}
