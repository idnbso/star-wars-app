import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { FilmDTO } from './search-characters/film.dto';
import { FilmsSearchResponseDTO } from './search-characters/films-search-response.dto';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly API_HOST = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  async getFilmTitles(query: string): Promise<FilmsSearchResponseDTO> {
    const apiQuery = query ? `?title=${query}` : '';
    const request = this.http.get(`${this.API_HOST}/films${apiQuery}`);
    return await lastValueFrom<any>(request);
  }

  async getFilm(id: number, expandFields?: string): Promise<FilmDTO> {
    const query = expandFields ? `?expand=${expandFields}` : '';
    const request = this.http.get(`${this.API_HOST}/films/${id}${query}`);
    return await lastValueFrom<any>(request);
  }
}
