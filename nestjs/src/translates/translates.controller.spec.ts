import { Test, TestingModule } from '@nestjs/testing';
import { TranslatesController } from './translates.controller';
import { TranslatesService } from './translates.service';

describe('TranslatesController', () => {
  let controller: TranslatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslatesController],
      providers: [TranslatesService],
    }).compile();

    controller = module.get<TranslatesController>(TranslatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
