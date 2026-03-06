using Microsoft.AspNetCore.Mvc;
using SBL.Web.Models.ViewModels;
using SBL.Web.Services;

namespace SBL.Web.Controllers;

public class AccountController : Controller
{
    private readonly IAuthService _authService;
    private readonly ILogger<AccountController> _logger;

    public AccountController(IAuthService authService, ILogger<AccountController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Login()
    {
        // If the user is already logged in, redirect to the dashboard
        if (HttpContext.Session.GetString("JWTToken") != null)
        {
            return RedirectToAction("Index", "Dashboard");
        }

        var model = new LoginViewModel();
        GenerateCaptcha(model);
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model)
    {
        // Validate Captcha
        var expectedResult = HttpContext.Session.GetString("CaptchaResult");
        if (model.CaptchaAnswer != expectedResult)
        {
            ModelState.AddModelError("CaptchaAnswer", "Invalid captcha answer.");
            GenerateCaptcha(model);
            return View(model);
        }

        if (!ModelState.IsValid)
        {
            GenerateCaptcha(model);
            return View(model);
        }

        var response = await _authService.AuthenticateAsync(model.EmpId, model.Password);

        if (response != null && response.status == "200")
        {
            // Store token and user details in session
            HttpContext.Session.SetString("JWTToken", response.token);
            HttpContext.Session.SetString("UserName", response.username);
            HttpContext.Session.SetString("EmpId", response.emp_id);
            HttpContext.Session.SetString("UserRole", response.desname);
            HttpContext.Session.SetString("BranchName", response.branchname);

            TempData["SuccessMessage"] = $"Welcome back, {response.username}!";
            _logger.LogInformation("User {EmpId} logged in successfully", model.EmpId);
            return RedirectToAction("Index", "Dashboard");
        }

        ModelState.AddModelError(string.Empty, "Invalid login attempt. Please check your credentials.");
        TempData["ErrorMessage"] = "Authentication failed. Please try again.";
        _logger.LogWarning("Failed login attempt for user {EmpId}", model.EmpId);
        GenerateCaptcha(model);
        return View(model);
    }

    private void GenerateCaptcha(LoginViewModel model)
    {
        var random = new Random();
        int a = random.Next(1, 10);
        int b = random.Next(1, 10);
        model.CaptchaQuestion = $"{a} + {b} = ?";
        HttpContext.Session.SetString("CaptchaResult", (a + b).ToString());
    }

    [HttpPost]
    public IActionResult Logout()
    {
        HttpContext.Session.Clear();
        return RedirectToAction("Login");
    }

    [HttpGet]
    public IActionResult Profile()
    {
        if (HttpContext.Session.GetString("JWTToken") == null)
        {
            return RedirectToAction("Login");
        }

        ViewData["Title"] = "User Profile";
        return View();
    }

    [HttpGet]
    public IActionResult Conversation(string appId)
    {
        if (HttpContext.Session.GetString("JWTToken") == null)
        {
            return RedirectToAction("Login");
        }

        ViewData["Title"] = "Conversation Hub";
        ViewData["AppId"] = appId; // Store appId for the back button
        
        var userName = HttpContext.Session.GetString("UserName") ?? "Branch User";
        var userDept = HttpContext.Session.GetString("UserRole") ?? "Branch";

        var model = new ConversationViewModel
        {
            OtherUserName = "Rahat Ahmed",
            OtherUserDept = "CAD Admin",
            Messages = new List<ChatMessage>
            {
                new() { SenderName = "Rahat Ahmed", SenderDept = "CAD Admin", Message = $"Hello, regarding application {appId ?? "APP-2024-001"}. Some documents are missing.", Timestamp = DateTime.Now.AddHours(-2), IsMe = false },
                new() { SenderName = userName, SenderDept = userDept, Message = "I am looking into it. Which documents exactly?", Timestamp = DateTime.Now.AddHours(-1.5), IsMe = true },
                new() { SenderName = "Rahat Ahmed", SenderDept = "CAD Admin", Message = "The Audit Financial Statement for 2023 is not clear.", Timestamp = DateTime.Now.AddHours(-1), IsMe = false },
                new() { SenderName = userName, SenderDept = userDept, Message = "Got it. I will re-upload a high-resolution scan by today.", Timestamp = DateTime.Now.AddMinutes(-30), IsMe = true },
                new() { SenderName = "Rahat Ahmed", SenderDept = "CAD Admin", Message = "Great, thanks! Let me know once done.", Timestamp = DateTime.Now.AddMinutes(-10), IsMe = false }
            }
        };

        return View(model);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View("~/Views/Shared/Error.cshtml");
    }
}
