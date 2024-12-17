using System.Security.Claims;
using Application.Contracts.Infrastructure.Identity;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Identity.Repository
{
    public class BaseRepositoryIdentityUserHttpContext : IBaseRepositoryIdentityUserHttpContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

       public BaseRepositoryIdentityUserHttpContext(IHttpContextAccessor httpContextAccessor)
       {
        _httpContextAccessor = httpContextAccessor;
       }

       public long GetUserId()
       {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            bool validId = long.TryParse(userIdString, out long userId);

            if (string.IsNullOrEmpty(userIdString) || !validId || userId == 0)
            {
                return 0;
            };

            return userId;
       }
    }
}