import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TranslatesModule } from './translates/translates.module';
import { SpeechesModule } from './speeches/speeches.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TranslatesModule,
    SpeechesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
