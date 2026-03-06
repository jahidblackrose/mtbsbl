using Microsoft.AspNetCore.Mvc;
using SBL.Web.Models;
using SBL.Web.Models.ViewModels;
using SBL.Web.Services;

namespace SBL.Web.Controllers;

public class LoanController : Controller
{
    private readonly ILoanService _loanService;
    private readonly IPdfService _pdfService;

    public LoanController(ILoanService loanService, IPdfService pdfService)
    {
        _loanService = loanService;
        _pdfService = pdfService;
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
        var model = new SBL.Web.Models.ViewModels.LoanApplicationViewModel
        {
            Documents = new List<SBL.Web.Models.ViewModels.ApplicationDocument>
            {
                new() { Name = "Trade License", Uploaded = false },
                new() { Name = "Bank Statement (12 Months)", Uploaded = false },
                new() { Name = "National ID", Uploaded = false },
                new() { Name = "TIN Certificate", Uploaded = false },
                new() { Name = "Utility Bill", Uploaded = false }
            }
        };
        return View(model);
    }

    [HttpGet]
    public IActionResult LookupAccount(string accountNumber)
    {
        if (string.IsNullOrEmpty(accountNumber)) return Json(new { success = false });

        // Mock API Call Response
        return Json(new { 
            success = true, 
            data = new {
                customerName = "Md. Jahidur Rahman",
                fathersName = "Late Md. Azizur Rahman",
                mothersName = "Mrs. Jahanara Begum",
                dob = "1985-05-15",
                gender = "Male",
                maritalStatus = "Married",
                nid = "1985269412345678",
                tin = "123456789012",
                mobile = "01711000000",
                email = "jahid@example.com",
                profession = "Business",
                designation = "Proprietor",
                orgName = "Jahid Enterprise",
                income = 150000,
                presentAddress = "House 12, Road 5, Dhanmondi, Dhaka",
                permanentAddress = "Village: Raypur, PO: Raypur, Dist: Lakshmipur"
            }
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(SBL.Web.Models.ViewModels.LoanApplicationViewModel model)
    {
        if (ModelState.IsValid)
        {
            // Map ViewModel to Domain Model
            var domainModel = new LoanApplicationModel
            {
                CustomerName = model.CustomerName,
                Amount = model.RequestedAmount.ToString(),
                LoanType = Enum.TryParse<SBL.Web.Models.Enums.LoanType>(model.LoanType?.Replace(" ", "_"), true, out var parsedType) ? parsedType : SBL.Web.Models.Enums.LoanType.SBL,
                Status = SBL.Web.Models.Enums.LoanStatus.Submitted,
                Branch = "Corporate Head Office",
                RmName = "Sarwar Hossain"
            };

            await _loanService.SubmitApplicationAsync(domainModel);
            TempData["SuccessMessage"] = "Application submitted successfully!";
            return RedirectToAction(nameof(Index));
        }
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DownloadProposal(LoanApplicationViewModel model)
    {
        var pdfBytes = _pdfService.GenerateProposal(model);
        return File(pdfBytes, "application/pdf", $"Proposal_{model.AccountNumber}.pdf");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult DownloadSanction(LoanApplicationViewModel model)
    {
        var pdfBytes = _pdfService.GenerateSanction(model);
        return File(pdfBytes, "application/pdf", $"Sanction_{model.AccountNumber}.pdf");
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
