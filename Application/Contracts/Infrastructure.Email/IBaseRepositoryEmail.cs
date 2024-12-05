using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Contracts.Infrastructure.Email
{
    public interface IBaseRepositoryEmail
    {
        Task<bool> SendEmailAsync(string receiver, string subject, string body);
    }
}
