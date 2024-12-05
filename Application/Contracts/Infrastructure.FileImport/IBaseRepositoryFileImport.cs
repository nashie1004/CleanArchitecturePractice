using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.FileImport
{
    public interface IBaseRepositoryFileImport
    {
        Task<bool> ImportFile();
        Task<string> ExportFile();
        Task<object> GetFile();
    }
}
