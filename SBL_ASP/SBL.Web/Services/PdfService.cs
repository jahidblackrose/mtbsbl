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
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;

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

            string logoPath = Path.Combine(_env.WebRootPath, "images", "logo.jpeg");
            if (File.Exists(logoPath))
            {
                ImageData data = ImageDataFactory.Create(logoPath);
                Image img = new Image(data).SetWidth(100).SetHorizontalAlignment(HorizontalAlignment.RIGHT);
                document.Add(img);
            }

            Paragraph title = new Paragraph("LOAN APPLICATION LETTER")
                .SetFont(boldFont)
                .SetTextAlignment(TextAlignment.CENTER)
                .SetFontSize(18)
                .SetMarginBottom(20);
            document.Add(title);

            document.Add(new Paragraph($"Date: {DateTime.Now:dd MMM yyyy}").SetFontSize(10));
            document.Add(new Paragraph("Ref: MTB/SBL/APP/2026/001").SetFontSize(10).SetMarginBottom(20));

            document.Add(new Paragraph("To,")
                .SetFont(boldFont)
                .SetFontSize(11));
            document.Add(new Paragraph("The Relationship Manager,")
                .SetFontSize(11));
            document.Add(new Paragraph($"Mutual Trust Bank Limited, {branch} Branch.")
                .SetFontSize(11)
                .SetMarginBottom(20));

            document.Add(new Paragraph($"Subject: Application for Small Business Loan (SBL) facility of BDT {amount}/-")
                .SetFont(boldFont)
                .SetFontSize(11)
                .SetMarginBottom(15));

            document.Add(new Paragraph($"Dear Sir,")
                .SetFontSize(11));
            
            Paragraph body = new Paragraph($"I, {customerName}, am writing to formally apply for a Small Business Loan facility. " +
                $"The proposed amount is BDT {amount} for the purpose of '{purpose}'.")
                .SetFontSize(11)
                .SetTextAlignment(TextAlignment.JUSTIFIED)
                .SetMarginBottom(10);
            document.Add(body);

            document.Add(new Paragraph("I have attached all necessary documents as per the MTB SBL checklist for your kind review and processing.")
                .SetFontSize(11)
                .SetMarginBottom(30));

            document.Add(new Paragraph("Sincerely,")
                .SetFontSize(11));
            document.Add(new Paragraph("__________________________")
                .SetMarginTop(20));
            document.Add(new Paragraph(customerName)
                .SetFont(boldFont)
                .SetFontSize(11));

            document.Close();
            return ms.ToArray();
        }
    }

    public byte[] GenerateMultiPageApplication(string applicationId, string customerName)
    {
        using (MemoryStream ms = new MemoryStream())
        {
            PdfWriter writer = new PdfWriter(ms);
            PdfDocument pdf = new PdfDocument(writer);
            
            // Register persistent footer event handler
            pdf.AddEventHandler(PdfDocumentEvent.END_PAGE, new ApplicationFooter(applicationId));

            Document document = new Document(pdf);
            document.SetMargins(40, 40, 60, 40);

            PdfFont boldFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
            PdfFont regularFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

            // Correct use of SolidLine for LineSeparator
            SolidLine solidLine = new SolidLine(0.5f);

            document.Add(new Paragraph("SECTION 1: APPLICATION SUMMARY")
                .SetFont(boldFont).SetFontSize(14).SetTextAlignment(TextAlignment.CENTER));
            document.Add(new LineSeparator(solidLine).SetMarginTop(5).SetMarginBottom(15));
            
            document.Add(new Paragraph($"This document consolidates multiple application types for Customer: {customerName}.")
                .SetFont(regularFont).SetFontSize(10));
            document.Add(new Paragraph("1. General Application Data\n2. Financial Assessment Form\n3. Legal & Compliance Declaration")
                .SetFont(regularFont).SetFontSize(10).SetMarginTop(10));

            document.Add(new AreaBreak(AreaBreakType.NEXT_PAGE));

            document.Add(new Paragraph("SECTION 2: FINANCIAL ASSESSMENT FORM")
                .SetFont(boldFont).SetFontSize(14).SetTextAlignment(TextAlignment.CENTER));
            document.Add(new LineSeparator(solidLine).SetMarginTop(5).SetMarginBottom(15));

            for (int i = 1; i <= 35; i++)
            {
                document.Add(new Paragraph($"{i}. Financial Indicator Description: ____________________________________")
                    .SetFont(regularFont).SetFontSize(10).SetMarginTop(5));
            }

            document.Add(new AreaBreak(AreaBreakType.NEXT_PAGE));

            document.Add(new Paragraph("SECTION 3: LEGAL & COMPLIANCE DECLARATION")
                .SetFont(boldFont).SetFontSize(14).SetTextAlignment(TextAlignment.CENTER));
            document.Add(new LineSeparator(solidLine).SetMarginTop(5).SetMarginBottom(15));

            for (int p = 1; p <= 3; p++)
            {
                document.Add(new Paragraph($"Declaration Clause Part {p}")
                    .SetFont(boldFont).SetFontSize(11).SetUnderline().SetMarginTop(10));
                
                for (int j = 1; j <= 15; j++)
                {
                    document.Add(new Paragraph($"Clause {p}.{j}: I hereby declare that all information provided regarding section {p} item {j} is true and correct to the best of my knowledge.")
                        .SetFont(regularFont).SetFontSize(10).SetMarginTop(5).SetTextAlignment(TextAlignment.JUSTIFIED));
                }
                if (p < 3) document.Add(new AreaBreak(AreaBreakType.NEXT_PAGE));
            }

            document.Close();
            return ms.ToArray();
        }
    }

    // --- Modern iText 9 Footer Event Handler ---
    private class ApplicationFooter : AbstractPdfDocumentEventHandler
    {
        private readonly string _applicationId;

        public ApplicationFooter(string applicationId)
        {
            _applicationId = applicationId;
        }

        protected override void OnAcceptedEvent(AbstractPdfDocumentEvent @event)
        {
            PdfDocumentEvent docEvent = (PdfDocumentEvent)@event;
            PdfPage page = docEvent.GetPage();
            PdfDocument pdf = docEvent.GetDocument();
            iText.Kernel.Geom.Rectangle pageSize = page.GetPageSize();
            
            PdfCanvas pdfCanvas = new PdfCanvas(page.NewContentStreamBefore(), page.GetResources(), pdf);
            Canvas canvas = new Canvas(pdfCanvas, pageSize);

            float x = (pageSize.GetLeft() + pageSize.GetRight()) / 2;
            float y = pageSize.GetBottom() + 25;

            canvas.ShowTextAligned(new Paragraph($"Application ID: {_applicationId}")
                .SetFontSize(8)
                .SetFontColor(ColorConstants.GRAY),
                x, y, TextAlignment.CENTER);
            
            canvas.Close();
        }
    }
}
