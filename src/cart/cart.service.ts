import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class CartService {
  constructor(private readonly redisService: RedisService) {}

  // Ajouter un produit au panier
  async addToCart(userId: string, productId: string, quantity: number) {
    const redisClient = this.redisService.getClient();
    const cartKey = this.getCartKey(userId);
    const product = await redisClient.hget(cartKey, productId);

    // Si le produit existe déjà, on incrémente la quantité
    const currentQuantity = product ? JSON.parse(product).quantity : 0;
    const newQuantity = currentQuantity + quantity;

    const item = {
      productId,
      quantity: newQuantity,
    };

    await redisClient.hset(cartKey, productId, JSON.stringify(item));
  }

  // Récupérer le panier de l'utilisateur
  async getCart(userId: string): Promise<any[]> {
    const redisClient = this.redisService.getClient();
    const cartKey = this.getCartKey(userId);
    const cartItems = await redisClient.hgetall(cartKey);

    return Object.keys(cartItems).map((key) => JSON.parse(cartItems[key]));
  }

  // Supprimer un produit du panier
  async removeFromCart(userId: string, productId: string) {
    const redisClient = this.redisService.getClient();
    const cartKey = this.getCartKey(userId);
    await redisClient.hdel(cartKey, productId);
  }

  // Vider le panier
  async clearCart(userId: string) {
    const redisClient = this.redisService.getClient();
    const cartKey = this.getCartKey(userId);
    await redisClient.del(cartKey);
  }

  // Générer la clé du panier pour l'utilisateur
  private getCartKey(userId: string): string {
    return `cart:${userId}`;
  }
}
