using System.ComponentModel.DataAnnotations;

namespace SBL.Web.Models.ViewModels;

public class DemoViewModel
{
    [Required(ErrorMessage = "Full Name is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 50 characters")]
    [Display(Name = "Full Name")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Valid Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Mobile Number is required")]
    [RegularExpression(@"^(?:\+8801|01)[3-9]\d{8}$", ErrorMessage = "Invalid Bangladesh Mobile Number")]
    public string MobileNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Age is required")]
    [Range(18, 100, ErrorMessage = "Age must be between 18 and 100")]
    public int? Age { get; set; }

    [Display(Name = "I agree to terms and conditions")]
    [Range(typeof(bool), "true", "true", ErrorMessage = "You must agree to the terms")]
    public bool AgreeToTerms { get; set; }

    [Required(ErrorMessage = "Please select a gender")]
    public string Gender { get; set; } = string.Empty;

    [Required(ErrorMessage = "Primary Branch is required")]
    [Display(Name = "Primary Branch")]
    public string PrimaryBranch { get; set; } = string.Empty;

    [Required(ErrorMessage = "Account Type is required")]
    [Display(Name = "Account Type")]
    public string AccountType { get; set; } = string.Empty;

    [Required(ErrorMessage = "Comments are required")]
    [MinLength(10, ErrorMessage = "Comments must be at least 10 characters")]
    public string Comments { get; set; } = string.Empty;

    [Required(ErrorMessage = "Date of Birth is required")]
    [Display(Name = "Date of Birth")]
    public DateTime? DateOfBirth { get; set; }

    [Display(Name = "Budget Range")]
    public int Budget { get; set; } = 2500;

    public string BrandColor { get; set; } = "#2563eb";

    [Display(Name = "Identity Document")]
    public IFormFile? Document { get; set; }
}

public class DemoDataModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime Date { get; set; }
}
