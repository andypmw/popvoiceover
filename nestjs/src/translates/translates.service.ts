
import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandInput,
  TranslateTextCommandOutput
} from '@aws-sdk/client-translate';
import { Injectable } from '@nestjs/common';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';

@Injectable()
export class TranslatesService {
  async create(createTranslateDto: CreateTranslateDto) {
    const client = new TranslateClient({ region: 'ap-southeast-1'});

    const input : TranslateTextCommandInput = {
      Text: createTranslateDto.Text,
      SourceLanguageCode: createTranslateDto.SourceLanguageCode,
      TargetLanguageCode: createTranslateDto.TargetLanguageCode,
    };

    const command = new TranslateTextCommand(input);

    const response: TranslateTextCommandOutput = await client.send(command);

    return {
      TranslatedText: response.TranslatedText
    };
  }

  findAll() {
    return `This action returns all translates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslateDto) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
