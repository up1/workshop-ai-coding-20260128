const PDFDocument = require('pdfkit');

function generatePDF(quotation, items) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50, size: 'A4' });
            const chunks = [];

            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));
            doc.on('error', reject);

            doc.fontSize(20).text('Invoice / Delivery Note', { align: 'center' });
            doc.moveDown();

            doc.fontSize(10);
            doc.text(`Volume No.: ${quotation.volume_no || '-'}`, 400, 80);
            doc.text(`Document No.: ${quotation.document_no}`, 400, 95);
            doc.text(`Date: ${quotation.date}`, 400, 110);

            doc.moveDown(2);
            doc.fontSize(12);
            doc.text(`Seller: ${quotation.seller_name}`, 50, 140);
            doc.text(`Address: ${quotation.seller_address || '-'}`, 50, 155);
            doc.moveDown();
            doc.text(`Customer: ${quotation.customer_name}`, 50, 185);
            doc.text(`Address: ${quotation.customer_address || '-'}`, 50, 200);

            const tableTop = 240;
            const tableHeaders = ['No.', 'Description', 'Qty', 'Unit', 'Price/Unit', 'Total'];
            const columnWidths = [40, 180, 60, 60, 80, 80];
            let xPos = 50;

            doc.fontSize(10).font('Helvetica-Bold');
            tableHeaders.forEach((header, i) => {
                doc.text(header, xPos, tableTop, { width: columnWidths[i], align: 'center' });
                xPos += columnWidths[i];
            });

            doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

            doc.font('Helvetica');
            let yPos = tableTop + 25;

            items.forEach((item) => {
                xPos = 50;
                const rowData = [
                    item.item_number.toString(),
                    item.description,
                    item.quantity.toString(),
                    item.unit,
                    item.price_per_unit.toFixed(2),
                    item.total.toFixed(2)
                ];

                rowData.forEach((data, i) => {
                    const align = i >= 2 ? 'right' : 'left';
                    doc.text(data, xPos, yPos, { width: columnWidths[i], align });
                    xPos += columnWidths[i];
                });

                yPos += 20;
            });

            doc.moveTo(50, yPos).lineTo(550, yPos).stroke();
            yPos += 10;

            doc.font('Helvetica-Bold');
            doc.text('Grand Total:', 370, yPos);
            doc.text(quotation.total_amount.toFixed(2), 470, yPos, { width: 80, align: 'right' });

            if (quotation.amount_in_words) {
                yPos += 25;
                doc.font('Helvetica');
                doc.text(`Amount in Words: ${quotation.amount_in_words}`, 50, yPos);
            }

            const signatureY = 650;
            doc.fontSize(10).font('Helvetica');
            doc.text('_______________________', 100, signatureY);
            doc.text("Receiver's Signature", 115, signatureY + 15);

            doc.text('_______________________', 350, signatureY);
            doc.text("Sender's Signature", 365, signatureY + 15);

            doc.end();
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { generatePDF };
