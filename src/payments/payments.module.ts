import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { ConfigModule } from '@nestjs/config'; // Pour gérer les variables d'environnement
import { PaymentStrategy } from './payment-strategy.service';
import { StripePaymentService } from './stripe-payment.service';
import { PayPalPaymentService } from './paypal-payment.service';

@Module({
  imports: [ConfigModule], // ConfigModule pour gérer la clé API de Stripe
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentStrategy,
    StripePaymentService,
    PayPalPaymentService,
  ],
})
export class PaymentsModule {}
