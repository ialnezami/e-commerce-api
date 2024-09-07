import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from './payment-provider.interface';
import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PayPalPaymentService implements PaymentProvider {
  private paypalClient: any;

  constructor(private configService: ConfigService) {
    const environment = new paypal.core.SandboxEnvironment(
      this.configService.get('PAYPAL_CLIENT_ID'),
      this.configService.get('PAYPAL_CLIENT_SECRET'),
    );
    this.paypalClient = new paypal.core.PayPalHttpClient(environment);
  }

  async createPaymentIntent(amount: number, currency: string): Promise<any> {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toString(),
          },
        },
      ],
    });
    return await this.paypalClient.execute(request);
  }

  async createCheckoutSession(
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ): Promise<any> {
    // Similar logic to create a PayPal session
    return this.createPaymentIntent(100, 'USD'); // Example implementation
  }
}
