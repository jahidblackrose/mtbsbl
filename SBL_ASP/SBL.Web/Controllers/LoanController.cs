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

    public IActionResult Details(string id)
    {
        // Mocking the specific APP-2024-001 or any ID
        var model = new SBL.Web.Models.ViewModels.ApplicationDetailViewModel
        {
            Id = id ?? "APP-2024-001",
            CustomerName = "Md. Jahidur Rahman",
            LoanType = "Small Business Loan",
            Amount = "BDT 5,000,000",
            Tenure = "60 Months",
            Branch = "Corporate Head Office",
            RmName = "Sarwar Hossain",
            Purpose = "Business Expansion & Working Capital",
            Status = "under_review",
            CreatedAt = DateTime.Now.AddDays(-5),
            Documents = new List<SBL.Web.Models.ViewModels.ApplicationDocument>
            {
                new() { Name = "Valid Trade License", Uploaded = true },
                new() { Name = "Last 12 Months Bank Statement", Uploaded = true },
                new() { Name = "National ID / Passport", Uploaded = true },
                new() { Name = "Utility Bill (Business/Residence)", Uploaded = true },
                new() { Name = "Financial Statements (Audit)", Uploaded = false },
                new() { Name = "CIB Undertaking", Uploaded = true }
            }
        };

        ViewData["Title"] = $"Application {model.Id}";
        return View(model);
    }
}
