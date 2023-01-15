import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { map, catchError, lastValueFrom } from 'rxjs';
import { CharactersService } from 'src/characters/characters.service';
import { FilmDTO } from './film.dto';

@Injectable()
export class FilmsService {
  private readonly API_HOST = 'https://swapi.dev/api';
  private expandableFieldsDataFactory: any;

  constructor(
    private http: HttpService,
    private charactersService: CharactersService,
  ) {
    this.expandableFieldsDataFactory = {
      characters: this.charactersService.getCharacters.bind(this),
    };
  }

  async getFilmsTitles(title?: string): Promise<string[]> {
    const query = title ? `?search=${title}` : '';
    const request = this.http
      .get(`${this.API_HOST}/films${query}`)
      .pipe(
        map(({ data: { results } }) => {
          return results.map(({ title }) => title);
        }),
      )
      .pipe(
        catchError((error) => {
          throw new HttpException(
            `Get films titles error: ${error.message}`,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(request);
  }

  async getFilm(id: number, expandFields?: string): Promise<FilmDTO> {
    const request = this.http
      .get(`${this.API_HOST}/films/${id}`)
      .pipe(
        map(async ({ data }) => {
          const film: FilmDTO = {
            title: data.title,
            episodeId: data.episode_id,
            director: data.director,
            producer: data.producer,
            releaseDate: data.release_date,
          };

          for (const field of Object.keys(this.expandableFieldsDataFactory)) {
            if (expandFields.includes(field)) {
              const ids = data[field]?.map(this.extractResourceIdFromURL);

              if (!ids || !ids.length) {
                return;
              }

              film[field] = await this.expandableFieldsDataFactory[field](ids);
            }
          }

          return film;
        }),
      )
      .pipe(
        catchError((error) => {
          throw new HttpException(
            `Get film error: ${error.message}`,
            error.response?.status,
          );
        }),
      );

    return await lastValueFrom(request);
  }

  extractResourceIdFromURL(url: string): string {
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    return !lastPart ? urlParts[urlParts.length - 2] : lastPart;
  }
}
