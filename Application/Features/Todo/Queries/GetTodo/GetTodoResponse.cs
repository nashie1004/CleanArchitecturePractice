using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetTodo
{
    public class GetTodoResponse : BaseResponse
    {
        public TodoItem TodoItem { get; set; }
    }
}
