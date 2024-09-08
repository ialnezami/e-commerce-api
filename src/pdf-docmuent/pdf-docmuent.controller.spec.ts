import { Test, TestingModule } from '@nestjs/testing';
import { PdfDocmuentController } from './pdf-docmuent.controller';
import { PdfDocmuentService } from './pdf-docmuent.service';

describe('PdfDocmuentController', () => {
  let controller: PdfDocmuentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfDocmuentController],
      providers: [PdfDocmuentService],
    }).compile();

    controller = module.get<PdfDocmuentController>(PdfDocmuentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
