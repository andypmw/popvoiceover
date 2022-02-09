import { Test, TestingModule } from '@nestjs/testing';
import { SpeechesService } from './speeches.service';

describe('SpeechesService', () => {
  let service: SpeechesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeechesService],
    }).compile();

    service = module.get<SpeechesService>(SpeechesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
