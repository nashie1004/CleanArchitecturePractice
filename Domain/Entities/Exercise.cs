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
    public class Exercise : AuditableEntity
    {
        [Key]
        public long ExerciseId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [MaxLength(200)]
        public string? ImageUrl { get; set; }

        public GeneratedBy GeneratedBy { get; set; }

        public long ExerciseCategoryId { get; set; }
        public ExerciseCategory ExerciseCategory { get; set; }
    }
}
