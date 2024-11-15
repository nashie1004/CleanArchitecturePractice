using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public class AuditableEntity
    {
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long LastUpdatedBy { get; set; }
        public DateTime LastUpdatedDate { get; set; }
    }
}
