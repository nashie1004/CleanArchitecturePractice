using Domain.Common;
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

        public decimal Weight { get; set; }

        [ForeignKey("WorkoutHeader")]
        public long WorkoutHeaderId { get; set; }

        [ForeignKey("Exercise")]
        public long ExerciseId { get; set; }
    }
}
