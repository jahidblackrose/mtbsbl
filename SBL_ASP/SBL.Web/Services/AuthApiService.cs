using System.Net.Http.Json;
using SBL.Web.Models;

namespace SBL.Web.Services;

public class AuthApiService : IAuthService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<AuthApiService> _logger;

    public AuthApiService(HttpClient httpClient, ILogger<AuthApiService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<LoginResponse?> AuthenticateAsync(string empId, string password)
    {
        // 1. Check for Mock Credentials first (for development/demo)
        if (empId.StartsWith("C") || empId == "admin" || empId == "rm")
        {
            await Task.Delay(1000); // Simulate network latency
            return new LoginResponse
            {
                status = "200",
                message = "success",
                emp_id = empId,
                username = empId == "C3711" ? "Md. Jahidur Rahman" : "Mock User " + empId,
                deptname = "MTB Digital Banking",
                branchname = "Main Branch",
                desname = empId == "admin" ? "System Administrator" : "Branch SME RM",
                token = "mock-jwt-token-" + Guid.NewGuid().ToString()
            };
        }

        try
        {
            var request = new LoginRequest
            {
                apptype = "test",
                empid = empId,
                userpassword = password
            };

            var response = await _httpClient.PostAsJsonAsync("api/v1/KrishiRin/agriloanassistantuserauthenticate", request);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<LoginResponse>();
            }

            var errorContent = await response.Content.ReadAsStringAsync();
            _logger.LogError("Auth API failed with status {Status}: {Error}", response.StatusCode, errorContent);
            
            // Fallback to mock if API is unreachable in dev environment
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Auth API. Returning null.");
            return null;
        }
    }
}
