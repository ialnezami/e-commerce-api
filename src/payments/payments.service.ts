import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
      //   apiVersion: '2022-11-15', // Assure-toi d'utiliser la dernière version de l'API Stripe
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent;
  }

  async createCheckoutSession(
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ) {
    const session = await this.stripe.checkout.sessions.create({
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

    return session;
  }
}
