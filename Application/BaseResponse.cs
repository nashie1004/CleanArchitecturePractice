using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class BaseResponse
    {
        public bool IsSuccess { get; set; }
        public int RowsAffected { get; set; }
        public string Message { get; set; }
        public List<string> ValidationErrors { get; set; }
    }
}
