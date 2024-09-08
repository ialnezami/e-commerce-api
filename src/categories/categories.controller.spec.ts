import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './interface/category.interface';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result: Category[] = [
        { id: '1', name: 'Category 1' },
        { id: '2', name: 'Category 2' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single category by id', async () => {
      const result: Category = { id: '1', name: 'Category 1' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
    });

    it('should return null if no category is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      expect(await controller.findOne('non-existent-id')).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new category', async () => {
      const createCategoryDto: Partial<Category> = { name: 'New Category' };
      const result: Category = { id: '1', name: 'New Category' };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createCategoryDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update and return the updated category', async () => {
      const id = '1';
      const updateData: Partial<Category> = { name: 'Updated Category' };
      const result: Category = { id: '1', name: 'Updated Category' };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateData)).toEqual(result);
    });

    it('should return null if no category is found to update', async () => {
      const id = 'non-existent-id';
      const updateData: Partial<Category> = { name: 'Updated Category' };
      jest.spyOn(service, 'update').mockResolvedValue(null);

      expect(await controller.update(id, updateData)).toBeNull();
    });
  });

  describe('remove', () => {
    it('should call remove and return void', async () => {
      const id = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
    });

    it('should not throw an error if the category does not exist', async () => {
      const id = 'non-existent-id';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(id)).resolves.toBeUndefined();
    });
  });
});
