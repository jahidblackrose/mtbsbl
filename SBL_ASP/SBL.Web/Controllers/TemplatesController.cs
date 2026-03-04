using Microsoft.AspNetCore.Mvc;

namespace SBL.Web.Controllers;

public class TemplatesController : Controller
{
    [HttpGet]
    public IActionResult Index()
    {
        ViewData["Title"] = "UI Templates & Components";
        return View();
    }
}
