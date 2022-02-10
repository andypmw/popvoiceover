import { 
  PollyClient, 
  SynthesizeSpeechCommand, 
  SynthesizeSpeechCommandInput,
  SynthesizeSpeechCommandOutput
} from '@aws-sdk/client-polly';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CreateSpeechDto } from './dto/create-speech.dto';
import { UpdateSpeechDto } from './dto/update-speech.dto';
import map from './constants/aws/polly/soundmap';
import neuralList from './constants/aws/polly/neural';

@Injectable()
export class SpeechesService {
  async create(createSpeechDto: CreateSpeechDto) {
    const client = new PollyClient({ region: 'ap-southeast-1'});

    // Check, is the language support neural mode?
    const mode = neuralList.filter(item => item.code === createSpeechDto.LanguageCode).length > 0? 'neural' : 'standard';

    const input: SynthesizeSpeechCommandInput = {
      OutputFormat: 'mp3',
      Engine: mode,
      Text: createSpeechDto.Text,
      VoiceId: map[createSpeechDto.LanguageCode]
    };

    const command = new SynthesizeSpeechCommand(input);

    const response: SynthesizeSpeechCommandOutput = await client.send(command);

    let filename = 'not-available';

    if (response.AudioStream instanceof Readable) {
      filename = 'static/' + uuidv4() + '.mp3';
      let filepath = 'public/' + filename;

      response.AudioStream.pipe(fs.createWriteStream(filepath));
    }
    
    return {
      FileName: filename
    };
  }

  findAll() {
    return `This action returns all speeches`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speech`;
  }

  update(id: number, updateSpeechDto: UpdateSpeechDto) {
    return `This action updates a #${id} speech`;
  }

  remove(id: number) {
    return `This action removes a #${id} speech`;
  }
}
