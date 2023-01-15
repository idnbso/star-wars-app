import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { CharacterDTO } from './character.dto';

@Injectable()
export class CharactersService {
  private readonly API_HOST = 'https://swapi.dev/api';

  constructor(private http: HttpService) {}

  async getCharacters(ids?: string[]): Promise<any> {
    try {
      const requests = ids.map((id) =>
        this.http.get(`${this.API_HOST}/people/${id}`).pipe(
          map(({ data }): CharacterDTO => {
            return {
              name: data.name,
              birthYear: data.birth_year,
              eyeColor: data.eye_color,
              gender: data.gender,
              hairColor: data.hair_color,
            };
          }),
        ),
      );

      return Promise.all(requests.map((request) => lastValueFrom(request)));
    } catch (error) {
      throw new HttpException(
        `Get characters error: ${error.message}`,
        error.response?.status,
      );
    }
  }
}
