using Application.Contracts.Infra;
using Application.Contracts.Infra.Todo;
using Domain.Entities;
using Infrastructure.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Repository.Todo
{
    public class TodoRepository : BaseRepositoryPersistence<TodoItem>, ITodoRepository
    {
        public TodoRepository(MainContext ctx) : base(ctx)
        {
            
        }
    }
}
