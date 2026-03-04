namespace SBL.Web.Services;

public interface IPdfService
{
    byte[] GenerateApplicationLetter(string customerName, string amount, string branch, string purpose);
}
