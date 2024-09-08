import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category } from './interface/category.interface';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let model: Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken('Category'),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    model = module.get<Model<Category>>(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [
        { _id: '1', name: 'Category 1' } as Category,
        { _id: '2', name: 'Category 2' } as Category,
      ];
      jest.spyOn(model, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single category by id', async () => {
      const result: Category = { _id: '1', name: 'Category 1' } as Category;
      jest.spyOn(model, 'findById').mockResolvedValue(result);

      expect(await service.findOne('1')).toBe(result);
    });

    it('should return null if no category is found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      expect(await service.findOne('99')).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new category', async () => {
      const category: Category = { _id: '1', name: 'Category 1' } as Category;
      jest.spyOn(model, 'create').mockResolvedValue(category);

      expect(await service.create(category)).toBe(category);
    });
  });

  describe('update', () => {
    it('should update and return the updated category', async () => {
      const updatedCategory: Category = {
        _id: '1',
        name: 'Updated Category',
      } as Category;
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedCategory);

      expect(await service.update('1', { name: 'Updated Category' })).toBe(
        updatedCategory,
      );
    });

    it('should return null if no category is found to update', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);

      expect(
        await service.update('99', { name: 'Updated Category' }),
      ).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete the category and return void', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockResolvedValue({ _id: '1' } as Category);

      await expect(service.remove('1')).resolves.toBeUndefined();
    });

    it('should not throw an error if the category does not exist', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(service.remove('99')).resolves.toBeUndefined();
    });
  });
});
