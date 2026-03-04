namespace SBL.Web.Models;

public class LoginRequest
{
    public string apptype { get; set; } = "test";
    public string empid { get; set; } = string.Empty;
    public string userpassword { get; set; } = string.Empty;
}

public class LoginResponse
{
    public string status { get; set; } = string.Empty;
    public string message { get; set; } = string.Empty;
    public string emp_id { get; set; } = string.Empty;
    public string username { get; set; } = string.Empty;
    public string deptcode { get; set; } = string.Empty;
    public string deptname { get; set; } = string.Empty;
    public string branchname { get; set; } = string.Empty;
    public string desname { get; set; } = string.Empty;
    public string branchcode { get; set; } = string.Empty;
    public string corp_email { get; set; } = string.Empty;
    public string officephone { get; set; } = string.Empty;
    public string mobilephone { get; set; } = string.Empty;
    public string office_type { get; set; } = string.Empty;
    public string rmcode { get; set; } = string.Empty;
    public string token { get; set; } = string.Empty;
}
