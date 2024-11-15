using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetAllTodo
{
    public class GetAllTodoHandler : IRequestHandler<GetAllTodoRequest, GetAllTodoResponse>
    {
        public GetAllTodoHandler()
        {
            
        }

        public async Task<GetAllTodoResponse> Handle(GetAllTodoRequest req, CancellationToken cancellationToken)
        {
            var retVal = new GetAllTodoResponse();

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
