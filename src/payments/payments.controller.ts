import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ) {
    return this.paymentsService.createPaymentIntent(amount, currency);
  }

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body()
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ) {
    return this.paymentsService.createCheckoutSession(products);
  }
}
