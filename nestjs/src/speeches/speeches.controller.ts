import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeechesService } from './speeches.service';
import { CreateSpeechDto } from './dto/create-speech.dto';
import { UpdateSpeechDto } from './dto/update-speech.dto';
import languages from './constants/aws/polly/standard';

@Controller('speeches')
export class SpeechesController {
  constructor(private readonly speechesService: SpeechesService) {}

  @Get('/speech-languages')
  getSpeechLanguages() {
    return languages;
  }

  @Post()
  create(@Body() createSpeechDto: CreateSpeechDto) {
    return this.speechesService.create(createSpeechDto);
  }

  @Get()
  findAll() {
    return this.speechesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speechesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeechDto: UpdateSpeechDto) {
    return this.speechesService.update(+id, updateSpeechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speechesService.remove(+id);
  }
}
