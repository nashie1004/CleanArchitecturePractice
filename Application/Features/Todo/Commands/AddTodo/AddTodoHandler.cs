using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Commands.AddTodo
{
    public class AddTodoHandler : IRequestHandler<AddTodoRequest, AddTodoResponse>
    {
        public AddTodoHandler()
        {
            
        }

        public async Task<AddTodoResponse> Handle(AddTodoRequest request, CancellationToken cancellationToken)
        {
            var retVal = new AddTodoResponse()
            {
                IsSuccess = true
                ,TodoItem = new() { Description = request.Description }
            };

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
