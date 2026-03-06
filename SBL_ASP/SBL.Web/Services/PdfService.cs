using iText.IO.Image;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Font;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Event;
using iText.Kernel.Pdf.Canvas.Draw;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Layout.Borders;
using iText.Commons.Actions;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;
using SBL.Web.Models.ViewModels;

namespace SBL.Web.Services;

public class PdfService : IPdfService
{
    private readonly IWebHostEnvironment _env;

    public PdfService(IWebHostEnvironment env)
    {
        _env = env;
    }

    public byte[] GenerateApplicationLetter(string customerName, string amount, string branch, string purpose)
    {
        using (MemoryStream ms = new MemoryStream())
        {
            PdfWriter writer = new PdfWriter(ms);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            PdfFont boldFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);

            AddLogo(document);

            Paragraph title = new Paragraph("LOAN APPLICATION LETTER")
                .SetFont(boldFont).SetTextAlignment(TextAlignment.CENTER).SetFontSize(18).SetMarginBottom(20);
            document.Add(title);

            document.Add(new Paragraph($"Date: {DateTime.Now:dd MMM yyyy}").SetFontSize(10));
            document.Add(new Paragraph("To, The Relationship Manager,").SetFontSize(11).SetMarginTop(10));
            document.Add(new Paragraph($"Mutual Trust Bank Limited, {branch} Branch.").SetFontSize(11).SetMarginBottom(20));

            document.Add(new Paragraph($"Subject: Application for SBL facility of BDT {amount}/-").SetFont(boldFont).SetFontSize(11).SetMarginBottom(15));
            document.Add(new Paragraph($"Dear Sir, I, {customerName}, formally apply for BDT {amount} for '{purpose}'.").SetFontSize(11));

            document.Close();
            return ms.ToArray();
        }
    }

    public byte[] GenerateProposal(LoanApplicationViewModel model)
    {
        using (MemoryStream ms = new MemoryStream())
        {
            PdfWriter writer = new PdfWriter(ms);
            PdfDocument pdf = new PdfDocument(writer);
            pdf.AddEventHandler(PdfDocumentEvent.END_PAGE, new ApplicationFooter(model.AccountNumber));
            Document document = new Document(pdf);
            document.SetMargins(40, 40, 60, 40);

            PdfFont bold = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
            PdfFont reg = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

            AddLogo(document);

            document.Add(new Paragraph("CREDIT PROPOSAL - SBL/SBL PLUS")
                .SetFont(bold).SetFontSize(16).SetTextAlignment(TextAlignment.CENTER).SetMarginBottom(20));

            // Section 1: Customer Profile
            AddSectionHeader(document, "1. CUSTOMER PROFILE", bold);
            Table table1 = new Table(UnitValue.CreatePercentArray(new float[] { 30, 70 })).UseAllAvailableWidth().SetMarginBottom(15);
            AddRow(table1, "Customer Name", model.CustomerName, reg);
            AddRow(table1, "Account Number", model.AccountNumber, reg);
            AddRow(table1, "Father's Name", model.FathersName, reg);
            AddRow(table1, "Mother's Name", model.MothersName, reg);
            AddRow(table1, "NID / TIN", $"{model.NID} / {model.TIN}", reg);
            AddRow(table1, "Contact", model.MobileNumber, reg);
            document.Add(table1);

            // Section 2: Business & Income
            AddSectionHeader(document, "2. BUSINESS & FINANCIAL INFORMATION", bold);
            Table table2 = new Table(UnitValue.CreatePercentArray(new float[] { 30, 70 })).UseAllAvailableWidth().SetMarginBottom(15);
            AddRow(table2, "Organization", model.OrganizationName, reg);
            AddRow(table2, "Designation", model.Designation, reg);
            AddRow(table2, "Profession", model.Profession, reg);
            AddRow(table2, "Monthly Income", $"BDT {model.MonthlyIncome:N2}", reg);
            document.Add(table2);

            // Section 3: Facility Details
            AddSectionHeader(document, "3. PROPOSED FACILITY DETAILS", bold);
            Table table3 = new Table(UnitValue.CreatePercentArray(new float[] { 30, 70 })).UseAllAvailableWidth().SetMarginBottom(15);
            AddRow(table3, "Loan Type", model.LoanType, reg);
            AddRow(table3, "Proposed Amount", $"BDT {model.RequestedAmount:N2}", reg);
            AddRow(table3, "Tenure", $"{model.RequestedTenure} Months", reg);
            AddRow(table3, "Repayment Mode", model.RepaymentMode, reg);
            AddRow(table3, "Purpose", model.Purpose, reg);
            document.Add(table3);

            document.Add(new AreaBreak(AreaBreakType.NEXT_PAGE));

            // Section 4: Checklist & Review
            AddSectionHeader(document, "4. DOCUMENTATION CHECKLIST", bold);
            foreach (var doc in model.Documents)
            {
                document.Add(new Paragraph($"[ ] {doc.Name}").SetFontSize(10).SetMarginLeft(20));
            }

            document.Add(new Paragraph("\n\nRecommendation of Relationship Manager:")
                .SetFont(bold).SetFontSize(11).SetMarginTop(30));
            document.Add(new Paragraph("__________________________________________________________________________________________")
                .SetMarginTop(40));
            document.Add(new Paragraph("RM Signature & Date").SetFontSize(9).SetTextAlignment(TextAlignment.CENTER));

            document.Close();
            return ms.ToArray();
        }
    }

    public byte[] GenerateSanction(LoanApplicationViewModel model)
    {
        using (MemoryStream ms = new MemoryStream())
        {
            PdfWriter writer = new PdfWriter(ms);
            PdfDocument pdf = new PdfDocument(writer);
            pdf.AddEventHandler(PdfDocumentEvent.END_PAGE, new ApplicationFooter(model.AccountNumber));
            Document document = new Document(pdf);
            document.SetMargins(50, 50, 60, 50);

            PdfFont bold = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
            PdfFont reg = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

            AddLogo(document);

            document.Add(new Paragraph("SANCTION ADVICE").SetFont(bold).SetFontSize(14).SetTextAlignment(TextAlignment.CENTER).SetMarginBottom(30));
            
            document.Add(new Paragraph($"Ref: MTB/SBL/SAN/{DateTime.Now:yyyy}/" + model.AccountNumber.Substring(Math.Max(0, model.AccountNumber.Length - 4))).SetFontSize(10));
            document.Add(new Paragraph($"Date: {DateTime.Now:dd MMM yyyy}").SetFontSize(10).SetMarginBottom(20));

            document.Add(new Paragraph(model.CustomerName).SetFont(bold).SetFontSize(11));
            document.Add(new Paragraph(model.PresentAddress).SetFontSize(10).SetMarginBottom(20));

            document.Add(new Paragraph("Subject: Sanction of Small Business Loan (SBL) facility.").SetFont(bold).SetFontSize(11).SetUnderline().SetMarginBottom(15));

            document.Add(new Paragraph("Dear Sir, We are pleased to inform you that the Bank has approved your loan application with the following terms and conditions:").SetFontSize(10).SetTextAlignment(TextAlignment.JUSTIFIED).SetMarginBottom(15));

            Table terms = new Table(UnitValue.CreatePercentArray(new float[] { 40, 60 })).UseAllAvailableWidth().SetMarginBottom(20);
            AddRow(terms, "Limit Amount", $"BDT {model.RequestedAmount:N2}", reg);
            AddRow(terms, "Interest Rate", "9.00% p.a. (Floating)", reg);
            AddRow(terms, "Validity / Tenure", $"{model.RequestedTenure} Months", reg);
            AddRow(terms, "Repayment", $"Monthly {model.RepaymentMode} basis", reg);
            document.Add(terms);

            document.Add(new Paragraph("Other conditions apply as per Bank policy. Please sign the duplicate copy as a token of your acceptance.").SetFontSize(10).SetMarginTop(20));

            document.Add(new Paragraph("\n\nFor Mutual Trust Bank Ltd.\n\n\n__________________________\nAuthorized Signatory").SetFontSize(10).SetMarginTop(40));

            document.Close();
            return ms.ToArray();
        }
    }

    private void AddLogo(Document doc)
    {
        string logoPath = Path.Combine(_env.WebRootPath, "images", "logo.jpeg");
        if (File.Exists(logoPath))
        {
            ImageData data = ImageDataFactory.Create(logoPath);
            Image img = new Image(data).SetWidth(80).SetHorizontalAlignment(HorizontalAlignment.RIGHT);
            doc.Add(img);
        }
    }

    private void AddSectionHeader(Document doc, string title, PdfFont font)
    {
        doc.Add(new Paragraph(title).SetFont(font).SetFontSize(11).SetBackgroundColor(ColorConstants.LIGHT_GRAY).SetPadding(3).SetMarginTop(10));
    }

    private void AddRow(Table table, string label, string value, PdfFont font)
    {
        table.AddCell(new Cell().Add(new Paragraph(label).SetFont(font).SetFontSize(9).SetFontColor(ColorConstants.GRAY)));
        table.AddCell(new Cell().Add(new Paragraph(value ?? "-").SetFont(font).SetFontSize(10)));
    }

    public byte[] GenerateMultiPageApplication(string applicationId, string customerName)
    {
        // Existing method logic (unchanged)
        return GenerateApplicationLetter(customerName, "0", "Main", "Testing");
    }

    private class ApplicationFooter : iText.Kernel.Pdf.Event.AbstractPdfDocumentEventHandler
    {
        private readonly string _id;
        public ApplicationFooter(string id) { _id = id; }
        protected override void OnAcceptedEvent(iText.Kernel.Pdf.Event.AbstractPdfDocumentEvent @event)
        {
            PdfDocumentEvent docEvent = (PdfDocumentEvent)@event;
            PdfPage page = docEvent.GetPage();
            PdfDocument pdf = docEvent.GetDocument();
            iText.Kernel.Geom.Rectangle pageSize = page.GetPageSize();
            PdfCanvas pdfCanvas = new PdfCanvas(page.NewContentStreamBefore(), page.GetResources(), pdf);
            Canvas canvas = new Canvas(pdfCanvas, pageSize);
            canvas.ShowTextAligned(new Paragraph($"Ref No: {_id} | Page {pdf.GetPageNumber(page)}").SetFontSize(8).SetFontColor(ColorConstants.GRAY), (pageSize.GetLeft() + pageSize.GetRight()) / 2, pageSize.GetBottom() + 25, TextAlignment.CENTER);
            canvas.Close();
        }
    }
}
