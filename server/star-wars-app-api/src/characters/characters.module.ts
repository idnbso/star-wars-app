import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [CharactersService],
  exports: [CharactersService],
})
export class CharactersModule {}
