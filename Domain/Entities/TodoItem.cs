using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class TodoItem
    {
        public long TodoItemId { get; set; }
        public bool IsDone { get; set; }
        public string Description { get; set; }
    }
}
