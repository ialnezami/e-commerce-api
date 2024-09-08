import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/orders/dto/order.dto';
import { PdfDocumentService } from './pdf-docmuent.service';
import { PdfDocumentController } from './pdf-docmuent.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [PdfDocumentService],
  controllers: [PdfDocumentController],
})
export class PdfDocumentModule {}
