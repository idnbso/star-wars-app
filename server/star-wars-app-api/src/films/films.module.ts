import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { HttpModule } from '@nestjs/axios';
import { CharactersModule } from 'src/characters/characters.module';

@Module({
  imports: [HttpModule, CharactersModule],
  controllers: [FilmsController],
  providers: [FilmsService],
})
export class FilmsModule {}
