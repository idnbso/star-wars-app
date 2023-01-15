import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { CharacterDTO } from './character.dto';
import { FilmSearchResultDTO } from './film-search-result.dto';
import { FilmDTO } from './film.dto';

@Component({
  selector: 'app-search-characters',
  templateUrl: './search-characters.component.html',
  styleUrls: ['./search-characters.component.scss'],
})
export class SearchCharactersComponent {
  filmTitle?: string;
  titleResults: FilmSearchResultDTO[] = [];

  resultsTableColumns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'hairColor', header: 'Hair Color' },
    { field: 'eyeColor', header: 'Eye Color' },
    { field: 'gender', header: 'Gender' },
    { field: 'birthYear', header: 'Birth Year' },
  ];
  filmCharacters: CharacterDTO[] = [];

  constructor(private searchService: SearchService) {}

  async search($event: any) {
    debugger;
    const { results } = await this.searchService.getFilmTitles($event.query);
    this.titleResults = results;
  }

  async select({ id }: any) {
    debugger;
    const film: FilmDTO = await this.searchService.getFilm(id, 'characters');
    this.filmCharacters = film.characters;
  }
}
