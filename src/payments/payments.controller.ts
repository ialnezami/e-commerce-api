import { Controller, Post, Body } from '@nestjs/common';
import { PaymentStrategy } from './payment-strategy.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentStrategy: PaymentStrategy) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body('provider') provider: string,
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ) {
    const paymentProvider = this.paymentStrategy.getPaymentProvider(provider);
    return paymentProvider.createPaymentIntent(amount, currency);
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body('provider') provider: string,
    @Body()
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ) {
    const paymentProvider = this.paymentStrategy.getPaymentProvider(provider);
    return paymentProvider.createCheckoutSession(products);
  }
}
