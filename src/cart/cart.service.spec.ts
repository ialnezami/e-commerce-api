import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { RedisService } from '../redis/redis.service';

describe('CartService', () => {
  let cartService: CartService;
  let redisService: RedisService;
  let redisClientMock: any;

  beforeEach(async () => {
    redisClientMock = {
      hget: jest.fn(),
      hset: jest.fn(),
      hgetall: jest.fn(),
      hdel: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: RedisService,
          useValue: {
            getClient: jest.fn(() => redisClientMock),
          },
        },
      ],
    }).compile();

    cartService = module.get<CartService>(CartService);
    redisService = module.get<RedisService>(RedisService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addToCart', () => {
    it('should add a product to the cart', async () => {
      redisClientMock.hget.mockResolvedValue(null); // Simuler un panier vide

      await cartService.addToCart('user1', 'product1', 2);

      expect(redisClientMock.hget).toHaveBeenCalledWith(
        'cart:user1',
        'product1',
      );
      expect(redisClientMock.hset).toHaveBeenCalledWith(
        'cart:user1',
        'product1',
        JSON.stringify({ productId: 'product1', quantity: 2 }),
      );
    });

    it('should increment quantity if product already exists in cart', async () => {
      redisClientMock.hget.mockResolvedValue(
        JSON.stringify({ productId: 'product1', quantity: 1 }),
      );

      await cartService.addToCart('user1', 'product1', 3);

      expect(redisClientMock.hget).toHaveBeenCalledWith(
        'cart:user1',
        'product1',
      );
      expect(redisClientMock.hset).toHaveBeenCalledWith(
        'cart:user1',
        'product1',
        JSON.stringify({ productId: 'product1', quantity: 4 }),
      );
    });
  });

  describe('getCart', () => {
    it('should return the cart items', async () => {
      redisClientMock.hgetall.mockResolvedValue({
        product1: JSON.stringify({ productId: 'product1', quantity: 2 }),
        product2: JSON.stringify({ productId: 'product2', quantity: 3 }),
      });

      const cart = await cartService.getCart('user1');
      expect(redisClientMock.hgetall).toHaveBeenCalledWith('cart:user1');
      expect(cart).toEqual([
        { productId: 'product1', quantity: 2 },
        { productId: 'product2', quantity: 3 },
      ]);
    });

    it('should return an empty array if cart is empty', async () => {
      redisClientMock.hgetall.mockResolvedValue({});

      const cart = await cartService.getCart('user1');
      expect(redisClientMock.hgetall).toHaveBeenCalledWith('cart:user1');
      expect(cart).toEqual([]);
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from the cart', async () => {
      await cartService.removeFromCart('user1', 'product1');
      expect(redisClientMock.hdel).toHaveBeenCalledWith(
        'cart:user1',
        'product1',
      );
    });
  });

  describe('clearCart', () => {
    it('should clear the cart', async () => {
      await cartService.clearCart('user1');
      expect(redisClientMock.del).toHaveBeenCalledWith('cart:user1');
    });
  });
});
