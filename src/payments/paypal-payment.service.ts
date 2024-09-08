import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from './payment-provider.interface';
import * as paypal from '@paypal/checkout-server-sdk';
import axios from 'axios';
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

  // Autres méthodes...

  // Vérification de la signature du webhook
  async verifyWebhook(req: Request): Promise<boolean> {
    const transmissionId = req.headers['paypal-transmission-id'] as string;
    const transmissionTime = req.headers['paypal-transmission-time'] as string;
    const webhookId = this.configService.get('PAYPAL_WEBHOOK_ID');
    const transmissionSig = req.headers['paypal-transmission-sig'] as string;
    const certUrl = req.headers['paypal-cert-url'] as string;
    const authAlgo = req.headers['paypal-auth-algo'] as string;

    const webhookEventBody = JSON.stringify(req.body);

    const response = await axios.post(
      `https://api.sandbox.paypal.com/v1/notifications/verify-webhook-signature`,
      {
        transmission_id: transmissionId,
        transmission_time: transmissionTime,
        webhook_id: webhookId,
        transmission_sig: transmissionSig,
        cert_url: certUrl,
        auth_algo: authAlgo,
        webhook_event: webhookEventBody,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await this.getAccessToken()}`,
        },
      },
    );

    return response.data.verification_status === 'SUCCESS';
  }

  // Obtenir un token d'accès PayPal
  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.configService.get('PAYPAL_CLIENT_ID')}:${this.configService.get(
        'PAYPAL_CLIENT_SECRET',
      )}`,
    ).toString('base64');

    const response = await axios.post(
      `https://api.sandbox.paypal.com/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data.access_token;
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
