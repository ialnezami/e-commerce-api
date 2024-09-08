import { Test, TestingModule } from '@nestjs/testing';
import { PdfDocmuentService } from './pdf-docmuent.service';

describe('PdfDocmuentService', () => {
  let service: PdfDocmuentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfDocmuentService],
    }).compile();

    service = module.get<PdfDocmuentService>(PdfDocmuentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
