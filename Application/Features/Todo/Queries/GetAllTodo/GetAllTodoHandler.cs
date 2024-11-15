using Application.Contracts.Infra.Todo;
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
        private readonly ITodoRepository _todoRepository;

        public GetAllTodoHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<GetAllTodoResponse> Handle(GetAllTodoRequest req, CancellationToken cancellationToken)
        {
            var retVal = new GetAllTodoResponse();

            try
            {
                if (req.Ids.Length > 0 && req.Ids != null)
                {
                    foreach(var id in req.Ids)
                    {
                        var item = await _todoRepository.GetRecordAsync(id);
                        retVal.TodoItems.Add(item);
                    }
                }
                else
                {
                    retVal.TodoItems = await _todoRepository.GetAllRecordAsync();
                }

            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
            }

            return retVal;
        }
    }
}
