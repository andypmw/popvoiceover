import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranslatesService } from './translates.service';
import { CreateTranslateDto } from './dto/create-translate.dto';
import { UpdateTranslateDto } from './dto/update-translate.dto';
import languages from './constants/aws/translate/source';
import map from './constants/aws/translatemap';

@Controller('translates')
export class TranslatesController {
  constructor(private readonly translatesService: TranslatesService) {}

  @Get('/source-languages')
  getSourceLanguages() {
    return languages;
  }

  @Get('/translate-to-polly-map')
  getTranslateToPollyMap() {
    return map;
  }

  @Post()
  create(@Body() createTranslateDto: CreateTranslateDto) {
    return this.translatesService.create(createTranslateDto);
  }

  @Get()
  findAll() {
    return this.translatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslateDto: UpdateTranslateDto) {
    return this.translatesService.update(+id, updateTranslateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translatesService.remove(+id);
  }
}
