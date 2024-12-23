﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class TodoItem : AuditableEntity
    {
        [Key]
        public long TodoItemId { get; set; }
        public bool IsDone { get; set; }
        public string Description { get; set; }
    }
}
