using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetTodo
{
    public class GetTodoRequest : IRequest<GetTodoResponse>
    {
        public long Id { get; set; }
    }
}
