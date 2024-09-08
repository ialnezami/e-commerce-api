import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { Delivery, DeliverySchema } from './entities/delivery.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Delivery.name, schema: DeliverySchema },
    ]),
  ],
  providers: [DeliveryService],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
