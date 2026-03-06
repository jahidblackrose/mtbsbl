using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SBL.Web.Models.ViewModels;

public class LoanApplicationViewModel
{
    public int CurrentStep { get; set; } = 1;
    
    [Required(ErrorMessage = "Account Number is required to start")]
    [Display(Name = "Account Number")]
    public string AccountNumber { get; set; } = string.Empty;

    // --- STEP 1: PERSONAL & PROFESSIONAL INFORMATION ---
    public string CustomerName { get; set; } = string.Empty;
    public string FathersName { get; set; } = string.Empty;
    public string MothersName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string MaritalStatus { get; set; } = string.Empty;
    public string NID { get; set; } = string.Empty;
    public string TIN { get; set; } = string.Empty;
    public string MobileNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    
    public string Profession { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string OrganizationName { get; set; } = string.Empty;
    public decimal MonthlyIncome { get; set; }

    public string PresentAddress { get; set; } = string.Empty;
    public string PermanentAddress { get; set; } = string.Empty;

    // --- STEP 2: LOAN INFORMATION ---
    public string LoanType { get; set; } = "Small Business Loan";
    public decimal RequestedAmount { get; set; }
    public int RequestedTenure { get; set; }
    public string Purpose { get; set; } = string.Empty;
    public string RepaymentMode { get; set; } = "EMI";

    // --- STEP 3: DOCUMENT INFORMATION ---
    public List<ApplicationDocument> Documents { get; set; } = new();

    // --- STEP 4: REVIEW & SUBMIT ---
    public bool IsAgreedToTerms { get; set; }
}
