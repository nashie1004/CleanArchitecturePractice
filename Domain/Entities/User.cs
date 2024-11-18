﻿using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : AuditableEntity
    {
        [Key]
        public long UserId { get; set; }
        public string UserName { get; set; }
        public decimal Weight { get; set; }
        public WeightMeasurement WeightMeasurement { get; set; }
    }
}
