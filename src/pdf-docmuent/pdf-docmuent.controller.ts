import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfDocumentService } from './pdf-docmuent.service';
import { OrdersService } from 'src/orders/orders.service';

@Controller('pdf')
export class PdfDocumentController {
  constructor(
    private readonly pdfDocumentService: PdfDocumentService,
    private readonly orderService: OrdersService,
  ) {}

  @Get('invoice/:orderId')
  async getInvoice(@Param('orderId') orderId: string, @Res() res: Response) {
    const order = await this.orderService.findById(orderId); // Assurez-vous que cette méthode existe
    if (!order) {
      return res.status(404).send('Order not found');
    }

    const pdfBuffer = await this.pdfDocumentService.generateInvoice(order);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="invoice-${orderId}.pdf"`,
    );
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  }
}
