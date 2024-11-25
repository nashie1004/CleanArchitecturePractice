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
    public class UserAuthHistory : AuditableEntity
    {
        [Key]
        public long UserAuthHistoryId { get; set; }
        public UserAuthAction Action { get; set; } // Login, Register, ChangePassword
    }
}
