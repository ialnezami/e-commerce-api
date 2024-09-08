import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

describe('CartController', () => {
  let cartController: CartController;
  let cartService: CartService;

  const mockCartService = {
    addToCart: jest.fn(),
    getCart: jest.fn(),
    removeFromCart: jest.fn(),
    clearCart: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
      ],
    }).compile();

    cartController = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToCart', () => {
    it('should call addToCart service with correct parameters', async () => {
      const dto = { userId: 'user1', productId: 'product1', quantity: 2 };

      await cartController.addToCart(dto.userId, dto.productId, dto.quantity);

      expect(cartService.addToCart).toHaveBeenCalledWith(
        dto.userId,
        dto.productId,
        dto.quantity,
      );
      expect(cartService.addToCart).toHaveBeenCalledTimes(1);
    });

    it('should return a success message after adding product', async () => {
      const dto = { userId: 'user1', productId: 'product1', quantity: 2 };

      const result = await cartController.addToCart(
        dto.userId,
        dto.productId,
        dto.quantity,
      );

      expect(result).toEqual({ message: 'Product added to cart' });
    });
  });

  describe('getCart', () => {
    it('should call getCart service with the correct userId', async () => {
      const userId = 'user1';
      mockCartService.getCart.mockResolvedValue([
        { productId: 'product1', quantity: 2 },
      ]);

      const result = await cartController.getCart(userId);

      expect(cartService.getCart).toHaveBeenCalledWith(userId);
      expect(cartService.getCart).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        cart: [{ productId: 'product1', quantity: 2 }],
      });
    });

    it('should return an empty cart if no products are present', async () => {
      const userId = 'user1';
      mockCartService.getCart.mockResolvedValue([]);

      const result = await cartController.getCart(userId);

      expect(result).toEqual({ cart: [] });
    });
  });

  describe('removeFromCart', () => {
    it('should call removeFromCart service with correct parameters', async () => {
      const dto = { userId: 'user1', productId: 'product1' };

      await cartController.removeFromCart(dto.userId, dto.productId);

      expect(cartService.removeFromCart).toHaveBeenCalledWith(
        dto.userId,
        dto.productId,
      );
      expect(cartService.removeFromCart).toHaveBeenCalledTimes(1);
    });

    it('should return a success message after removing product', async () => {
      const dto = { userId: 'user1', productId: 'product1' };

      const result = await cartController.removeFromCart(
        dto.userId,
        dto.productId,
      );

      expect(result).toEqual({ message: 'Product removed from cart' });
    });
  });

  describe('clearCart', () => {
    it('should call clearCart service with the correct userId', async () => {
      const userId = 'user1';

      await cartController.clearCart(userId);

      expect(cartService.clearCart).toHaveBeenCalledWith(userId);
      expect(cartService.clearCart).toHaveBeenCalledTimes(1);
    });

    it('should return a success message after clearing the cart', async () => {
      const userId = 'user1';

      const result = await cartController.clearCart(userId);

      expect(result).toEqual({ message: 'Cart cleared' });
    });
  });
});
