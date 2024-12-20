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
    public class WorkoutHeader : AuditableEntity
    {
        [Key]
        public long WorkoutHeaderId { get; set; }

        [MaxLength(300)]
        [Required]
        public string Title { get; set; }
        public string? Notes { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DurationMeasurement DurationMeasurement { get; set; } = DurationMeasurement.Minutes;
        public ICollection<WorkoutDetail> WorkoutDetails { get; set; } = new List<WorkoutDetail>(); 
    }
}
