using SBL.Web.Models;

namespace SBL.Web.Services;

public interface IAuthService
{
    Task<LoginResponse?> AuthenticateAsync(string empId, string password);
}
