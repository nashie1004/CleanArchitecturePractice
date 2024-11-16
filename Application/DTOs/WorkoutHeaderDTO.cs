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
        public string Title { get; set; }
        public decimal Duration { get; set; }
        public List<WorkoutDetailDTO> WorkoutDetails { get; set; }
    }
}
