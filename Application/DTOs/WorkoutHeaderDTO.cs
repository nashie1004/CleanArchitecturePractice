using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class WorkoutHeaderDTO
    {
        public long WorkoutHeaderId { get; set; }
        public string Title { get; set; }
        public string Notes { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public List<WorkoutDetailDTO> WorkoutDetails { get; set; }
    }
}
