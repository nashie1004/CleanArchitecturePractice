using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ExerciseCategoryDTO
    {
        public long ExerciseCategoryId { get; set; }

        public string Name { get; set; } // Strength, Cardio

        public string Description { get; set; }

        public bool GeneratedByUser { get; set; }
    }
}
