using Application.Contracts.Infra.Todo;
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
        private readonly ITodoRepository _todoRepository;

        public GetTodoHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<GetTodoResponse> Handle(GetTodoRequest request, CancellationToken cancellationToken)
        {
            var retVal = new GetTodoResponse();
            
            try
            {
                var record = await _todoRepository.GetRecordAsync(request.Id);
                
                if (record is null)
                {
                    retVal.IsSuccess = false;
                }
                else
                {
                    retVal.IsSuccess = true;
                    retVal.Record = record;
                }

                return retVal;
            } 
            catch (Exception ex)
            {

            }

            return retVal;
        }
    }
}
