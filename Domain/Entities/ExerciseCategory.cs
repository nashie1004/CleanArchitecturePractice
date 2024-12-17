using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class ExerciseCategory : AuditableEntity
    {
        [Key]
        public long ExerciseCategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } // Strength, Cardio

        [MaxLength(300)]
        public string? Description { get; set; }

        public GeneratedBy GeneratedBy { get; set; }

        public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}
