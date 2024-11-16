using Domain.Common;
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
        public decimal Duration { get; set; }
        public ICollection<WorkoutDetail> WorkoutDetails { get; set; } = new List<WorkoutDetail>(); 
    }
}
