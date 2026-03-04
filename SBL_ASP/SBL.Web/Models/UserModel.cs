using SBL.Web.Models.Enums;

namespace SBL.Web.Models;

public class UserModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string? Branch { get; set; }
}
