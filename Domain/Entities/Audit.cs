using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Audit : AuditableEntity
    {
        public long AuditId { get; set; }
        public string OldData { get; set; }
        public string NewData { get; set; }
        public long TablePrimaryKey { get; set; }
        public string TableName { get; set; }
        public short Action { get; set; }
    }
}
