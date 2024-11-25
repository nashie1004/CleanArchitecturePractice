using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum AuditAction : short
    {
        Login = 1,
        Register = 2,
        ChangePassword = 3,
        UpdateInfo = 4
    }
}
