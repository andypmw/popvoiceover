import { Test, TestingModule } from '@nestjs/testing';
import { TranslatesService } from './translates.service';

describe('TranslatesService', () => {
  let service: TranslatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslatesService],
    }).compile();

    service = module.get<TranslatesService>(TranslatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
