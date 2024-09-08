import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentStrategy } from './payment-strategy.service';
import { PayPalPaymentService } from './paypal-payment.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentStrategy: PaymentStrategy,
    private readonly payPalPaymentService: PayPalPaymentService,
  ) {}
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

  @Post('paypal-webhook')
  async handlePayPalWebhook(@Req() req: Request) {
    const webhookEvent = req.body;
    console.log('Webhook received:', webhookEvent);

    // Vérification de la signature du webhook
    const isValid = await this.payPalPaymentService.verifyWebhook(req);
    if (!isValid) {
      console.log('Webhook signature validation failed');
      throw new Error('Invalid webhook signature');
    }

    // Gérer les événements (exemple: payment capture, refund, etc.)
    switch (webhookEvent.event_type) {
      case 'CHECKOUT.ORDER.APPROVED':
        console.log('Order approved:', webhookEvent);
        // Logique pour gérer les commandes approuvées
        break;
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment captured:', webhookEvent);
        // Logique pour gérer les paiements capturés
        break;
      default:
        console.log(`Unhandled event type: ${webhookEvent.event_type}`);
    }

    return { status: 'success' };
  }
}
