using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application
{
    public class BaseResponse
    {
        public BaseResponse()
        {
            IsSuccess = true;
            RowsAffected = 0;
            Message = string.Empty;
            ValidationErrors = new List<string>();
        }

        public bool IsSuccess { get; set; } 
        public int RowsAffected { get; set; }
        public string Message { get; set; }
        public List<string> ValidationErrors { get; set; }
    }

    public class BaseResponseList<T> : BaseResponse where T:new()
    {
        public BaseResponseList()
        {
            Items = new List<T>();
        }

        public List<T> Items { get; set; }
    }

    public class BaseRequestList
    {
        public BaseRequestList() 
        {
            PageSize = 15;
            PageNumber = 1;
            SortBy = string.Empty;
            Filters = new List<string>();
        }

        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public string SortBy { get; set; }
        public object Filters { get; set; }
    }
}
