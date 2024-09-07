import { Injectable } from '@nestjs/common';
import { StripePaymentService } from './stripe-payment.service';
import { PayPalPaymentService } from './paypal-payment.service';
import { PaymentProvider } from './payment-provider.interface';

@Injectable()
export class PaymentStrategy {
  constructor(
    private stripePaymentService: StripePaymentService,
    private payPalPaymentService: PayPalPaymentService,
  ) {}

  getPaymentProvider(provider: string): PaymentProvider {
    switch (provider) {
      case 'stripe':
        return this.stripePaymentService;
      case 'paypal':
        return this.payPalPaymentService;
      default:
        throw new Error('Payment provider not supported');
    }
  }
}
