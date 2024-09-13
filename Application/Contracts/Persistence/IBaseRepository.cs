using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Persistence
{
    public interface IBaseRepository<T> where T : class
    {
        Task<bool> AddRecordAsync(T record);
        Task<bool> UpdateRecordAsync(T record);
        Task<bool> DeleteRecordAsync(long id);
        Task<T> GetRecordAsync(long id);
        Task<List<T>> GetAllRecordAsync();
    }
}
