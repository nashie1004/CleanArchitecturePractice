using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Application.DTOs
{
    public class WorkoutDetailDTO
    {
        public long WorkoutDetailId { get; set; }
        public long ExerciseId { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public decimal Weight { get; set; }
        public WeightMeasurement WeightMeasurementId { get; set; }
        public string Remarks { get; set; }
    }
}
