using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;
using System.Security.Claims;

namespace SBL.Web.Infrastructure.Filters;

public class AuditLogFilter : IActionFilter
{
    private readonly ILogger<AuditLogFilter> _logger;

    public AuditLogFilter(ILogger<AuditLogFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var user = context.HttpContext.User.Identity?.Name ?? "Anonymous";
        var controller = context.RouteData.Values["controller"];
        var action = context.RouteData.Values["action"];
        var ipAddress = context.HttpContext.Connection.RemoteIpAddress?.ToString();

        // Audit Log Entry
        _logger.LogInformation("AUDIT_LOG: User [{User}] is executing [{Controller}/{Action}] from IP [{IP}]", 
            user, controller, action, ipAddress);
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Log post-execution results if necessary (e.g., success/failure)
    }
}
