import { Component, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { timer } from 'rxjs';
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
  selectedFilmId?: number;

  @ViewChild('filmCharactersTable') filmCharactersTable?: Table;
  resultsTableColumns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'hairColor', header: 'Hair Color' },
    { field: 'eyeColor', header: 'Eye Color' },
    { field: 'gender', header: 'Gender' },
    { field: 'birthYear', header: 'Birth Year' },
  ];
  filmCharacters: CharacterDTO[] = [];
  totalCharacters: number = 0;
  loading: boolean = false;
  totalPageRows: number = 10;

  constructor(private searchService: SearchService) {}

  async search($event: any) {
    const { results } = await this.searchService.getFilmTitles($event.query);
    this.titleResults = results;
  }

  async select({ id }: any) {
    this.selectedFilmId = id;
    this.filmCharactersTable?.reset();
    await this.loadCharacters(undefined);
  }

  async loadCharacters($event?: LazyLoadEvent) {
    if (!this.selectedFilmId) {
      return;
    }

    this.loading = true;
    const film: FilmDTO = await this.searchService.getFilm(
      this.selectedFilmId!,
      $event?.first ?? 0,
      this.totalPageRows,
      'characters'
    );

    this.filmCharacters = film?.characters;
    this.totalCharacters = film?.totalCharacters;
    timer(0).subscribe(() => (this.loading = false));
  }
}
