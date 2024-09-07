import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ConfigModule } from '@nestjs/config'; // Pour gérer les variables d'environnement

@Module({
  imports: [ConfigModule], // ConfigModule pour gérer la clé API de Stripe
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
