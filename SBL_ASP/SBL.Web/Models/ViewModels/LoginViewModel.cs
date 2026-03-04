using System.ComponentModel.DataAnnotations;

namespace SBL.Web.Models.ViewModels;

public class LoginViewModel
{
    [Required(ErrorMessage = "Employee ID is required")]
    [Display(Name = "Employee ID")]
    public string EmpId { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    public bool RememberMe { get; set; }

    [Required(ErrorMessage = "Captcha answer is required")]
    public string CaptchaAnswer { get; set; } = string.Empty;

    public string CaptchaQuestion { get; set; } = string.Empty;
}
