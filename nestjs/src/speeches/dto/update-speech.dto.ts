import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeechDto } from './create-speech.dto';

export class UpdateSpeechDto extends PartialType(CreateSpeechDto) {}
