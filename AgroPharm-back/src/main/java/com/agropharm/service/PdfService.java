package com.agropharm.service;

import com.agropharm.domain.Order;
import com.agropharm.domain.OrderItem;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.LineSeparator;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class PdfService {

    public byte[] generateOrdersReport(List<Order> orders) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdfDocument = new PdfDocument(writer);
        Document document = new Document(pdfDocument);

        Paragraph title = new Paragraph("Izveštaj o prodajama")
                .setTextAlignment(TextAlignment.CENTER)
                .setFontSize(18);
        document.add(title);

        document.add(new Paragraph("\n\n"));

        String formattedDate = LocalDate.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
        Paragraph reportDate = new Paragraph("Datum izrade izveštaja: " + formattedDate)
                .setTextAlignment(TextAlignment.LEFT)
                .setFontSize(12);
        document.add(reportDate);
        document.add(new Paragraph("\n"));


        double totalSumOfOrders = 0;

        for (Order order : orders) {
            String formattedOrderDate = order.getDate().toLocalDateTime().format(DateTimeFormatter.ofPattern("dd.MM.yyyy"));
            Table orderInfoTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}));
            orderInfoTable.setWidth(UnitValue.createPercentValue(100));
            orderInfoTable.setBorder(null);

            orderInfoTable.addCell(new Paragraph("Narudžbina #" + order.getId())
                    .setFontSize(14)
                    .setBold()
                    .setTextAlignment(TextAlignment.LEFT)
                    .setBorder(Border.NO_BORDER));

            orderInfoTable.addCell(new Paragraph("Datum narudžbine: " + formattedOrderDate)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setBorder(Border.NO_BORDER));

            document.add(orderInfoTable);

            Table table = new Table(UnitValue.createPercentArray(new float[]{3, 2, 2, 2}));
            table.setWidth(UnitValue.createPercentValue(100));

            table.addHeaderCell("Proizvod");
            table.addHeaderCell("Kolicina");
            table.addHeaderCell("Cena po komadu (RSD)");
            table.addHeaderCell("Ukupna cena (RSD)");

            for (OrderItem item : order.getOrderItems()) {
                table.addCell(item.getProduct().getName());
                table.addCell(String.valueOf(item.getQuantity()));
                table.addCell(String.format("%.2f RSD", item.getProduct().getPrice()));
                table.addCell(String.format("%.2f RSD", item.getSum()));
            }

            document.add(table);

            double totalOrderSum = order.getOrderItems().stream().mapToDouble(OrderItem::getSum).sum();
            totalSumOfOrders += totalOrderSum;

            Paragraph totalPrice = new Paragraph("Ukupna cena narudžbine: " + String.format("%.2f RSD", totalOrderSum))
                    .setBold()
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setFontSize(12);
            document.add(totalPrice);

            document.add(new Paragraph("\n"));
        }

        Paragraph totalSumParagraph = new Paragraph("Ukupna cena svih narudžbina: " + String.format("%.2f RSD", totalSumOfOrders))
                .setBold()
                .setTextAlignment(TextAlignment.RIGHT)
                .setFontSize(14);
        document.add(totalSumParagraph);

        document.close();
        return outputStream.toByteArray();
    }

}
