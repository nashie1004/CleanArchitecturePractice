using Application.Contracts.Infrastructure.Identity;
using Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity.Repository
{
    public class BaseRepositoryIdentityToken : IBaseRepositoryIdentityToken
    {
        private readonly string _key;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly double _expiryMinutes;

        public BaseRepositoryIdentityToken(string key, string issueer, string audience, double expiryMinutes)
        {
            _key = key;
            _issuer = issueer;
            _audience = audience;
            _expiryMinutes = expiryMinutes;
        }

        public async Task<string> GenerateJWTTokenAsync(string userId, string userName)
        {
            string retVal = string.Empty;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, userName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                //expires: DateTime.Now.AddMinutes(30),
                expires: DateTime.Now.AddMinutes(_expiryMinutes),
                signingCredentials: credentials
                );

            retVal = new JwtSecurityTokenHandler().WriteToken(token);

            return retVal;
        }
    }
}
