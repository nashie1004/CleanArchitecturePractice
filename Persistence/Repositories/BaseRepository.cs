using Application.Contracts.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T>
        where T : class, new()
    {
        public BaseRepository() 
        { 
        
        }

        public async Task<bool> AddRecordAsync(T record)
        {
            return true;
        }

        public async Task<bool> UpdateRecordAsync(T record)
        {
            return true;
        }

        public async Task<bool> DeleteRecordAsync(long id)
        {
            return true;
        }

        public async Task<T> GetRecordAsync(long id)
        {
            var retVal = new T();

            return retVal;
        }

        public async Task<List<T>> GetAllRecordAsync()
        {
            var retVal = new List<T>();

            return retVal;
        }
    }
}
