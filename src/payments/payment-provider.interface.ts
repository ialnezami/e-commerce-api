export interface PaymentProvider {
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  createCheckoutSession(
    products: Array<{
      name: string;
      amount: number;
      currency: string;
      quantity: number;
    }>,
  ): Promise<any>;
}
