using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Commands.AddTodo
{
    public class AddTodoRequest : IRequest<AddTodoResponse>
    {
        public bool IsDone { get; set; }
        public string Description { get; set; }
    }
}
