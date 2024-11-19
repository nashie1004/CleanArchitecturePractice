using Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Audit : AuditableEntity
    {
        [Key]
        public long AuditId { get; set; }
        public string? OldData { get; set; } 
        public string? NewData { get; set; }

        [Required]
        public long TablePrimaryKey { get; set; }

        [Required]
        public string TableName { get; set; } 
        
        [Required]
        public short Action { get; set; }
    }
}
