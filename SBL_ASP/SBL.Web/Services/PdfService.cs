using iText.IO.Image;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using iText.Kernel.Pdf;
using iText.Kernel.Font;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Hosting;
using System.IO;

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

            // Pre-create fonts for reliability
            PdfFont boldFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);

            // 1. Add Logo
            string logoPath = Path.Combine(_env.WebRootPath, "images", "logo.jpeg");
            if (File.Exists(logoPath))
            {
                ImageData data = ImageDataFactory.Create(logoPath);
                Image img = new Image(data).SetWidth(100).SetHorizontalAlignment(HorizontalAlignment.RIGHT);
                document.Add(img);
            }

            // 2. Add Title
            Paragraph title = new Paragraph("LOAN APPLICATION LETTER")
                .SetFont(boldFont)
                .SetTextAlignment(TextAlignment.CENTER)
                .SetFontSize(18)
                .SetMarginBottom(20);
            document.Add(title);

            // 3. Add Date & Reference
            document.Add(new Paragraph($"Date: {DateTime.Now:dd MMM yyyy}").SetFontSize(10));
            document.Add(new Paragraph("Ref: MTB/SBL/APP/2026/001").SetFontSize(10).SetMarginBottom(20));

            // 4. Add Recipient
            document.Add(new Paragraph("To,")
                .SetFont(boldFont)
                .SetFontSize(11));
            document.Add(new Paragraph("The Relationship Manager,")
                .SetFontSize(11));
            document.Add(new Paragraph($"Mutual Trust Bank Limited, {branch} Branch.")
                .SetFontSize(11)
                .SetMarginBottom(20));

            // 5. Subject
            document.Add(new Paragraph($"Subject: Application for Small Business Loan (SBL) facility of BDT {amount}/-")
                .SetFont(boldFont)
                .SetFontSize(11)
                .SetMarginBottom(15));

            // 6. Body
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

            // 7. Footer
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
}
