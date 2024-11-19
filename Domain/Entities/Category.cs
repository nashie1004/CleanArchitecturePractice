using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Category : AuditableEntity
    {
        [Key]
        public long CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } // Strength, Cardio

        [MaxLength(300)]
        public string? Description { get; set; }
    }
}
