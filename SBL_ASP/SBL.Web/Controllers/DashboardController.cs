using Microsoft.AspNetCore.Mvc;
using SBL.Web.Services;

namespace SBL.Web.Controllers;

public class DashboardController : Controller
{
    private readonly ILoanService _loanService;

    public DashboardController(ILoanService loanService)
    {
        _loanService = loanService;
    }

    public async Task<IActionResult> Index()
    {
        var applications = await _loanService.GetAllApplicationsAsync();
        ViewData["Title"] = "Executive Dashboard";
        return View(applications);
    }
}
