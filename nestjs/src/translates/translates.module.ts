import { Module } from '@nestjs/common';
import { TranslatesService } from './translates.service';
import { TranslatesController } from './translates.controller';

@Module({
  controllers: [TranslatesController],
  providers: [TranslatesService]
})
export class TranslatesModule {}
