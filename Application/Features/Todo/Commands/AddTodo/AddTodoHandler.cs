using Application.Contracts.Infra.Todo;
using Domain.Entities;
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
        private readonly ITodoRepository _todoRepository;

        public AddTodoHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<AddTodoResponse> Handle(AddTodoRequest request, CancellationToken cancellationToken)
        {
            var retVal = new AddTodoResponse();

            try
            {
                var newRecord = new TodoItem()
                {
                    IsDone = request.IsDone
                    , Description = request.Description
                };

                await _todoRepository.AddRecordAsync(newRecord);
                
                retVal.RowsAffected = await _todoRepository.SaveRecordAsync(cancellationToken);
                retVal.IsSuccess = true;
            } 
            catch (Exception ex)
            {
                retVal.ValidationErrors.Add(ex.Message);
                retVal.IsSuccess = false;
            }

            return retVal;
        }
    }
}
