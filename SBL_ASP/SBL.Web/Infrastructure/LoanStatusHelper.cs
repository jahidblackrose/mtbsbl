using SBL.Web.Models.Enums;

namespace SBL.Web.Infrastructure;

public static class LoanStatusHelper
{
    public static string GetLabel(LoanStatus status) => status switch
    {
        LoanStatus.Draft => "Draft",
        LoanStatus.Submitted => "Submitted",
        LoanStatus.CibPending => "CIB Pending",
        LoanStatus.CibCompleted => "CIB Completed",
        LoanStatus.UnderReview => "Under Review",
        LoanStatus.QueryRaised => "Query Raised",
        LoanStatus.QueryResolved => "Query Resolved",
        LoanStatus.Approved => "Approved",
        LoanStatus.Declined => "Declined",
        LoanStatus.SanctionGenerated => "Sanction Generated",
        LoanStatus.ChargeDocsPending => "Charge Docs Pending",
        LoanStatus.ChargeDocsSubmitted => "Charge Docs Submitted",
        LoanStatus.LimitLoaded => "Limit Loaded",
        LoanStatus.Disbursed => "Disbursed",
        LoanStatus.Closed => "Closed",
        _ => status.ToString()
    };

    public static string GetVariant(LoanStatus status) => status switch
    {
        LoanStatus.Draft => "secondary",
        LoanStatus.Submitted => "info",
        LoanStatus.CibPending => "warning",
        LoanStatus.CibCompleted => "info",
        LoanStatus.UnderReview => "info",
        LoanStatus.QueryRaised => "warning",
        LoanStatus.QueryResolved => "info",
        LoanStatus.Approved => "success",
        LoanStatus.Declined => "destructive",
        LoanStatus.SanctionGenerated => "success",
        LoanStatus.ChargeDocsPending => "warning",
        LoanStatus.ChargeDocsSubmitted => "info",
        LoanStatus.LimitLoaded => "success",
        LoanStatus.Disbursed => "success",
        LoanStatus.Closed => "secondary",
        _ => "secondary"
    };

    public static string GetVariantClass(string variant) => variant switch
    {
        "success" => "bg-success text-success-foreground",
        "destructive" => "bg-destructive text-destructive-foreground",
        "warning" => "bg-warning text-warning-foreground",
        "info" => "bg-info text-info-foreground",
        "secondary" => "bg-secondary text-secondary-foreground",
        _ => "bg-secondary text-secondary-foreground"
    };
}
