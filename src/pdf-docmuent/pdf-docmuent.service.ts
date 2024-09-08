import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

@Injectable()
export class PdfDocumentService {
  async generateInvoice(order: any): Promise<Buffer> {
    const doc = new PDFDocument();
    const stream = doc.pipe(new PassThrough());

    doc.fontSize(20).text('Invoice', { align: 'center' });
    doc.moveDown();

    // Order Details
    doc.fontSize(16).text(`Order ID: ${order.id}`);
    doc.text(`Order Date: ${order.orderDate}`);
    doc.text(`Total Price: ${order.totalPrice}`);
    doc.moveDown();

    // Shipping Information
    doc.fontSize(16).text('Shipping Information');
    doc.text(`Address: ${order.shippingAddress}`);
    doc.text(`Payment Method: ${order.paymentMethod}`);
    doc.moveDown();

    // Order Items
    doc.fontSize(16).text('Order Items');
    order.orderItems.forEach((item: any) => {
      doc.text(
        `Product ID: ${item.productId} | Quantity: ${item.quantity} | Price: ${item.price}`,
      );
    });

    doc.end();

    return new Promise((resolve, reject) => {
      const buffers: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => buffers.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
      stream.on('error', reject);
    });
  }
}
