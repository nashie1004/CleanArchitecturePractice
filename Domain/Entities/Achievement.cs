﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Achievement : AuditableEntity
    {
        // TODO
        public Achievement()
        {
            
        }

        [Key]
        public long AchievementId { get; set; }
    }
}
