import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Ajouter un produit au panier
  @Post('add')
  async addToCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    await this.cartService.addToCart(userId, productId, quantity);
    return { message: 'Product added to cart' };
  }

  // Récupérer le panier
  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    const cart = await this.cartService.getCart(userId);
    return { cart };
  }

  // Supprimer un produit du panier
  @Delete('remove')
  async removeFromCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    await this.cartService.removeFromCart(userId, productId);
    return { message: 'Product removed from cart' };
  }

  // Vider le panier
  @Delete('clear/:userId')
  async clearCart(@Param('userId') userId: string) {
    await this.cartService.clearCart(userId);
    return { message: 'Cart cleared' };
  }
}
