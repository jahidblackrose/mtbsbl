using SBL.Web.Models;
using SBL.Web.Models.Enums;

namespace SBL.Web.Services;

public class LoanApiService : ILoanService
{
    private readonly HttpClient _httpClient;

    public LoanApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<IEnumerable<LoanApplicationModel>> GetAllApplicationsAsync()
    {
        // Placeholder for future API call
        // return await _httpClient.GetFromJsonAsync<IEnumerable<LoanApplicationModel>>("api/v1/applications") ?? new List<LoanApplicationModel>();
        
        await Task.Delay(100); // Simulate network latency
        return new List<LoanApplicationModel>
        {
            new LoanApplicationModel { CustomerName = "ABC Corp", Amount = "5000000", Status = LoanStatus.Submitted, Branch = "Main", RmName = "John Doe" },
            new LoanApplicationModel { CustomerName = "XYZ Traders", Amount = "2500000", Status = LoanStatus.CibPending, Branch = "Gulshan", RmName = "Jane Smith" }
        };
    }

    public async Task<LoanApplicationModel?> GetApplicationByIdAsync(Guid id)
    {
        // Placeholder for future API call
        return await Task.FromResult(new LoanApplicationModel { Id = id, CustomerName = "ABC Corp" });
    }

    public async Task<bool> SubmitApplicationAsync(LoanApplicationModel application)
    {
        // Placeholder for future API call
        return await Task.FromResult(true);
    }

    public async Task<bool> UpdateApplicationStatusAsync(Guid id, string status, string comments)
    {
        // Placeholder for future API call
        return await Task.FromResult(true);
    }
}
