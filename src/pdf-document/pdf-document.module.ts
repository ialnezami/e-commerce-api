import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/dto/order.dto';
import { PdfDocumentService } from './pdf-document.service';
import { PdfDocumentController } from './pdf-document.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [PdfDocumentService],
  controllers: [PdfDocumentController],
})
export class PdfDocumentModule {}
