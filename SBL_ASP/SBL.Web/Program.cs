using SBL.Web.Infrastructure.Filters;
using SBL.Web.Infrastructure.Middleware;
using SBL.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(options =>
{
    // Global Anti-Forgery Token Validation
    options.Filters.Add(new Microsoft.AspNetCore.Mvc.AutoValidateAntiforgeryTokenAttribute());
    
    // Global Audit Logging
    options.Filters.Add<AuditLogFilter>();
});

// Enable Health Checks
builder.Services.AddHealthChecks();

// Configure Secure Session Policy
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(20); // Enterprise session timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Always require HTTPS
    options.Cookie.SameSite = SameSiteMode.Strict; // Prevent CSRF via cross-site requests
});

// Register Banking Services
builder.Services.AddScoped<IPdfService, PdfService>();

builder.Services.AddHttpClient<IAuthService, AuthApiService>(client =>
{
    var baseUrl = builder.Configuration["AuthApiSettings:BaseUrl"] ?? "https://10.45.6.38/KrishiRinAPI/plapplication/";
    client.BaseAddress = new Uri(baseUrl);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
})
.ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
{
    // Bypassing SSL certificate validation for internal banking API IP as per bank's development environment
    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
});

builder.Services.AddHttpClient<ILoanService, LoanApiService>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["ApiSettings:BaseUrl"] ?? "https://localhost:5001/");
});

var app = builder.Build();

// Security Hardening: Apply Security Headers Middleware
app.UseSecurityHeaders();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Account/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios.
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.MapStaticAssets();

app.UseRouting();

app.UseSession();
app.UseAuthorization();

// Map Health Checks
app.MapHealthChecks("/health");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}")
    .WithStaticAssets();

app.Run();
