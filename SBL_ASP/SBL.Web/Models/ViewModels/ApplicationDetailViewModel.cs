using System;
using System.Collections.Generic;

namespace SBL.Web.Models.ViewModels;

public class ApplicationDetailViewModel
{
    public string Id { get; set; } = string.Empty;
    public string CustomerName { get; set; } = string.Empty;
    public string LoanType { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
    public string Tenure { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public string RmName { get; set; } = string.Empty;
    public string Purpose { get; set; } = string.Empty;
    public string Status { get; set; } = "draft";
    public DateTime CreatedAt { get; set; }
    public List<ApplicationDocument> Documents { get; set; } = new();
}

public class ApplicationDocument
{
    public string Name { get; set; } = string.Empty;
    public bool Uploaded { get; set; }
}
