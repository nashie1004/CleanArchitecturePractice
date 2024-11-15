using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Commands.AddTodo
{
    public class AddTodoResponse
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public TodoItem TodoItem { get; set; }
    }
}
