﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;

namespace Infrastructure.Identity.Models
{
    public class CustomUser : IdentityUser<long>
    {
    }
}
