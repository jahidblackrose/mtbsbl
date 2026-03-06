using Microsoft.AspNetCore.Mvc;
using SBL.Web.Models.ViewModels;
using SBL.Web.Services;

namespace SBL.Web.Controllers;

public class DemoController : Controller
{
    private readonly IPdfService _pdfService;

    public DemoController(IPdfService pdfService)
    {
        _pdfService = pdfService;
    }

    [HttpGet]
    public IActionResult Index()
    {
        ViewData["Title"] = "Component Demo";
        
        // Mock data for tables
        var mockData = GetMockData();
        ViewBag.TableData = mockData;
        
        return View(new DemoViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Index(DemoViewModel model)
    {
        if (ModelState.IsValid)
        {
            // Simulate processing time
            await Task.Delay(2000);
            TempData["SuccessMessage"] = "Form submitted successfully! Your data has been processed.";
            return RedirectToAction("Index");
        }

        ViewData["Title"] = "Component Demo";
        ViewBag.TableData = GetMockData();
        TempData["ErrorMessage"] = "There were errors in your submission. Please correct them and try again.";
        return View(model);
    }

    [HttpGet]
    public IActionResult GeneratePdf(string customerName, string amount, string branch, string purpose)
    {
        customerName ??= "Valued Customer";
        amount ??= "0.00";
        branch ??= "Main";
        purpose ??= "Loan Application";

        byte[] pdfBytes = _pdfService.GenerateApplicationLetter(customerName, amount, branch, purpose);
        
        // Return file for preview/download
        return File(pdfBytes, "application/pdf");
    }

    [HttpGet]
    public IActionResult GenerateMultiPagePdf(string customerName)
    {
        customerName ??= "Valued Customer";
        string applicationId = "APP-" + DateTime.Now.Ticks.ToString().Substring(10);
        byte[] pdfBytes = _pdfService.GenerateMultiPageApplication(applicationId, customerName);
        return File(pdfBytes, "application/pdf", $"Full_Application_{applicationId}.pdf");
    }

    private List<DemoDataModel> GetMockData()
    {
        var data = new List<DemoDataModel>();
        string[] names = { "Ahmed Ali", "Sara Khan", "Rahim Uddin", "Karim Baksh", "Fatima Begum", "Zayan Malik", "Nadia Hasan", "Tanvir Ahmed", "Ishrat Jahan", "Omar Faruk" };
        string[] statuses = { "Active", "Pending", "Inactive", "On Hold" };
        var rand = new Random();

        for (int i = 1; i <= 50; i++)
        {
            var name = names[rand.Next(names.Length)];
            data.Add(new DemoDataModel 
            { 
                Id = 1000 + i, 
                Name = $"{name} {i}", 
                Email = $"{name.ToLower().Replace(" ", ".")}@example.com", 
                Status = statuses[rand.Next(statuses.Length)], 
                Date = DateTime.Now.AddDays(-rand.Next(1, 30)) 
            });
        }
        return data;
    }
}
