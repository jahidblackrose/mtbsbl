using Microsoft.AspNetCore.Mvc;
using SBL.Web.Models;
using SBL.Web.Services;

namespace SBL.Web.Controllers;

public class LoanController : Controller
{
    private readonly ILoanService _loanService;

    public LoanController(ILoanService loanService)
    {
        _loanService = loanService;
    }

    public async Task<IActionResult> Index()
    {
        ViewData["Title"] = "Loan Applications";
        var applications = await _loanService.GetAllApplicationsAsync();
        return View(applications);
    }

    public IActionResult Create()
    {
        ViewData["Title"] = "New Application";
        return View(new LoanApplicationModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(LoanApplicationModel model)
    {
        if (ModelState.IsValid)
        {
            model.Branch = "Main Branch"; // Mock data
            model.RmName = "John Doe";    // Mock data
            await _loanService.SubmitApplicationAsync(model);
            return RedirectToAction(nameof(Index));
        }
        return View(model);
    }
}
