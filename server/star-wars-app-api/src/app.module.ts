import { Module } from '@nestjs/common';
import { FilmsModule } from './films/films.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [FilmsModule, CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
