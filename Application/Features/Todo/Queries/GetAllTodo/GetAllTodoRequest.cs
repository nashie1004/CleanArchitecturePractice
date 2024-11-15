using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetAllTodo
{
    public class GetAllTodoRequest : IRequest<GetAllTodoResponse>
    {
        public long[] Ids { get; set; }
    }
}
