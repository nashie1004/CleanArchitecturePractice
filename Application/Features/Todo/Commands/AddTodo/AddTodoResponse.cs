﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Todo.Commands.AddTodo
{
    public class AddTodoResponse : BaseResponse
    {
        public TodoItem TodoItem { get; set; }
    }
}