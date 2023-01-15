import { CharacterDTO } from 'src/characters/character.dto';

export interface FilmDTO {
  title: string;
  episodeId: number;
  director: string;
  producer: string;
  releaseDate: string;
  characters?: CharacterDTO[];
}
