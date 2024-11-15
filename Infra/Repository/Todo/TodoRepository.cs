﻿using Application.Contracts.Infra;
using Application.Contracts.Infra.Todo;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Todo
{
    public class TodoRepository : BaseRepository<TodoItem>, ITodoRepository
    {
        public TodoRepository(MainContext ctx) : base(ctx)
        {
            
        }
    }
}
