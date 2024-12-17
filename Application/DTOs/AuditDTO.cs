using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class AuditDTO
    {
        public long AuditId { get; set; }
        public string? OldData { get; set; }
        public string? NewData { get; set; }
        public long TablePrimaryKey { get; set; }
        public string TableName { get; set; }
        public short Action { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long? LastUpdatedBy { get; set; }
        public DateTime? LastUpdatedDate { get; set; }
    }
}
