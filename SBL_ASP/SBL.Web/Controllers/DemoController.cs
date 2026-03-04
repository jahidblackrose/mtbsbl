using Microsoft.AspNetCore.Mvc;
using SBL.Web.Models.ViewModels;

namespace SBL.Web.Controllers;

public class DemoController : Controller
{
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

    private List<DemoDataModel> GetMockData()
    {
        return new List<DemoDataModel>
        {
            new DemoDataModel { Id = 101, Name = "Ahmed Ali", Email = "ahmed@example.com", Status = "Active", Date = DateTime.Now.AddDays(-5) },
            new DemoDataModel { Id = 102, Name = "Sara Khan", Email = "sara@example.com", Status = "Pending", Date = DateTime.Now.AddDays(-2) },
            new DemoDataModel { Id = 103, Name = "Rahim Uddin", Email = "rahim@example.com", Status = "Inactive", Date = DateTime.Now.AddDays(-10) },
            new DemoDataModel { Id = 104, Name = "Karim Baksh", Email = "karim@example.com", Status = "Active", Date = DateTime.Now.AddDays(-1) },
            new DemoDataModel { Id = 105, Name = "Fatima Begum", Email = "fatima@example.com", Status = "Active", Date = DateTime.Now }
        };
    }
}
