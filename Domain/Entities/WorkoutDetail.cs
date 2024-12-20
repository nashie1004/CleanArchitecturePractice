using Domain.Common;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class WorkoutDetail : AuditableEntity
    {
        [Key]
        public long WorkoutDetailId { get; set; }

        public int Sets { get; set; }

        public int Reps { get; set; }

        public decimal? Weight { get; set; }
        public string? Remarks { get; set; }
        public WeightMeasurement WeightMeasurement { get; set; } = WeightMeasurement.Kilogram;

        [ForeignKey("WorkoutHeader")]
        public long WorkoutHeaderId { get; set; }

        public virtual WorkoutHeader WorkoutHeader { get; set; }

        [ForeignKey("Exercise")]
        public long ExerciseId { get; set; }
        public virtual Exercise Exercise { get; set; }
    }
}
