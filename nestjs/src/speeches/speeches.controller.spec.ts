import { Test, TestingModule } from '@nestjs/testing';
import { SpeechesController } from './speeches.controller';
import { SpeechesService } from './speeches.service';

describe('SpeechesController', () => {
  let controller: SpeechesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeechesController],
      providers: [SpeechesService],
    }).compile();

    controller = module.get<SpeechesController>(SpeechesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
