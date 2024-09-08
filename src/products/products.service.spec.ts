import { ProductsService } from './products.service';
import { Product } from './dto/product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an empty array initially', () => {
      const products = service.findAll();
      expect(products).toEqual([]);
    });

    it('should return all products', () => {
      const product1: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      const product2: Product = {
        id: 2,
        name: 'Product 2',
        description: 'Desc 2',
        price: 200,
        stock: 20,
        categoryId: 2,
      };
      service.create(product1);
      service.create(product2);
      const products = service.findAll();
      expect(products.length).toBe(2);
      expect(products).toEqual([product1, product2]);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      service.create(product);
      const foundProduct = service.findOne(1);
      expect(foundProduct).toEqual(product);
    });

    it('should return undefined if product does not exist', () => {
      const foundProduct = service.findOne(99);
      expect(foundProduct).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should add a new product', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      service.create(product);
      const products = service.findAll();
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(product);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      service.create(product);
      const updatedProduct: Product = {
        id: 1,
        name: 'Updated Product',
        description: 'Updated Desc',
        price: 150,
        stock: 5,
        categoryId: 1,
      };
      service.update(1, updatedProduct);
      const foundProduct = service.findOne(1);
      expect(foundProduct).toEqual(updatedProduct);
    });

    it('should not update a non-existing product', () => {
      const updatedProduct: Product = {
        id: 1,
        name: 'Updated Product',
        description: 'Updated Desc',
        price: 150,
        stock: 5,
        categoryId: 1,
      };
      service.update(99, updatedProduct);
      const foundProduct = service.findOne(99);
      expect(foundProduct).toBeUndefined();
    });
  });

  describe('remove', () => {
    it('should remove a product by id', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      service.create(product);
      service.remove(1);
      const products = service.findAll();
      expect(products.length).toBe(0);
    });

    it('should not remove a non-existing product', () => {
      const product: Product = {
        id: 1,
        name: 'Product 1',
        description: 'Desc 1',
        price: 100,
        stock: 10,
        categoryId: 1,
      };
      service.create(product);
      service.remove(99);
      const products = service.findAll();
      expect(products.length).toBe(1);
    });
  });
});
