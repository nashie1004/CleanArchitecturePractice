﻿using Application.Common;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Queries.GetAllTodo
{
    public class GetAllTodoResponse : BaseResponseList<TodoItem>
    {
        //public List<TodoItem> TodoItems { get; set; } = new List<TodoItem>();
    }
}
