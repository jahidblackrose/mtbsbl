namespace SBL.Web.Services;

public interface IPdfService
{
    byte[] GenerateApplicationLetter(string customerName, string amount, string branch, string purpose);
    byte[] GenerateMultiPageApplication(string applicationId, string customerName);
    byte[] GenerateProposal(SBL.Web.Models.ViewModels.LoanApplicationViewModel model);
    byte[] GenerateSanction(SBL.Web.Models.ViewModels.LoanApplicationViewModel model);
}
