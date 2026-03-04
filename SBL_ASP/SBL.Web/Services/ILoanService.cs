using SBL.Web.Models;

namespace SBL.Web.Services;

public interface ILoanService
{
    Task<IEnumerable<LoanApplicationModel>> GetAllApplicationsAsync();
    Task<LoanApplicationModel?> GetApplicationByIdAsync(Guid id);
    Task<bool> SubmitApplicationAsync(LoanApplicationModel application);
    Task<bool> UpdateApplicationStatusAsync(Guid id, string status, string comments);
}
