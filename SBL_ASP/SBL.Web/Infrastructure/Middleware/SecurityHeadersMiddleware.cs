namespace SBL.Web.Infrastructure.Middleware;

public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;

    public SecurityHeadersMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Remove Server Header to prevent version disclosure
        context.Response.Headers.Remove("Server");
        context.Response.Headers.Remove("X-Powered-By");

        // Prevent Clickjacking (Allow SAMEORIGIN for internal PDF preview)
        context.Response.Headers.Append("X-Frame-Options", "SAMEORIGIN");
        
        // Prevent MIME type sniffing
        context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
        
        // Anti-XSS Header for older browsers
        context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");

        // Content Security Policy (Hardened)
        context.Response.Headers.Append("Content-Security-Policy", 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com https://cdn.jsdelivr.net; " +
            "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com https://cdn.jsdelivr.net; " +
            "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com https://cdn.jsdelivr.net; " +
            "img-src 'self' data: https://readymadeui.com https://cdn.jsdelivr.net; " +
            "frame-ancestors 'self'; " +
            "form-action 'self';");

        // Referrer Policy
        context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

        // Feature Policy / Permissions Policy
        context.Response.Headers.Append("Permissions-Policy", "geolocation=(), camera=(), microphone=(), payment=()");

        await _next(context);
    }
}

public static class SecurityHeadersExtensions
{
    public static IApplicationBuilder UseSecurityHeaders(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<SecurityHeadersMiddleware>();
    }
}
