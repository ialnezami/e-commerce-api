import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PaymentProvider } from './payment-provider.interface';

@Injectable()
export class StripePaymentService implements PaymentProvider {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      // apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(amount: number, currency: string): Promise<any> {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async createCheckoutSession(
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ): Promise<any> {
    return await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: products.map((product) => ({
        price_data: {
          currency: product.currency,
          product_data: {
            name: product.name,
          },
          unit_amount: product.amount,
        },
        quantity: product.quantity,
      })),
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/success`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/cancel`,
    });
  }
}
