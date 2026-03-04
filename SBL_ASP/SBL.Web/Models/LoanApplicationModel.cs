using System.ComponentModel.DataAnnotations;
using SBL.Web.Models.Enums;

namespace SBL.Web.Models;

public class LoanApplicationModel
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [Display(Name = "Customer Name")]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [Display(Name = "Loan Type")]
    public LoanType LoanType { get; set; }

    [Required]
    [Display(Name = "Amount (৳)")]
    public string Amount { get; set; } = "0";

    [Required]
    [Display(Name = "Tenure (Months)")]
    public string Tenure { get; set; } = "12";

    [Required]
    public string Purpose { get; set; } = string.Empty;

    public LoanStatus Status { get; set; } = LoanStatus.Draft;

    public string Branch { get; set; } = string.Empty;

    [Display(Name = "RM Name")]
    public string RmName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
