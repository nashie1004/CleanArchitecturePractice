using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infra
{
    public interface IBaseRepositoryPersistence<T> where T : class
    {
        Task AddRecordAsync(T record);
        //Task<bool> UpdateRecordAsync(T record);
        Task<bool> DeleteRecordAsync(long id);
        Task<T> GetRecordAsync(long id);
        Task<T> GetRecordByPropertyAsync(Expression<Func<T, bool>> predicate);
        Task<List<T>> GetAllRecordAsync();
        Task<List<T>> GetAllRecordAsync(int pageSize, int pageNo);
        Task<int> SaveRecordAsync(CancellationToken ct = default);
        //Task<List<T2>> ExecRawQuery<T2>(string sqlQuery, params object[] parameters);
        Task ExecRawCommand<T2>(string sqlQuery, params object[] parameters);
    }
}
