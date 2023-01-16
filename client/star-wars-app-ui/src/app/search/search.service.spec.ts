import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FilmDTO } from './search-characters/film.dto';
import { FilmsSearchResponseDTO } from './search-characters/films-search-response.dto';

import { SearchService } from './search.service';

describe('SearchService', () => {
  const API_HOST = 'http://localhost:3000';
  let service: SearchService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return film titles', async () => {
    const dummyResponse: FilmsSearchResponseDTO = {
      results: [{ id: 1, title: 'test' }],
    };
    httpClientSpy.get.and.returnValue(of(dummyResponse));

    const response = await service.getFilmTitles('test');

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_HOST}/films?title=test`
    );
    expect(response).toEqual(dummyResponse);
  });

  it('should return a film with characters', async () => {
    const dummyFilmResponse: FilmDTO = {
      title: 'A New Hope',
      episodeId: 4,
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      releaseDate: '1977-05-25',
      characters: [
        {
          name: 'Test',
          hairColor: 'blonde',
          eyeColor: 'blue',
          gender: 'male',
          birthYear: 'unknown',
        },
      ],
      totalCharacters: 1,
    };
    httpClientSpy.get.and.returnValue(of(dummyFilmResponse));

    const response = await service.getFilm(1, 0, 10, 'characters');

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      `${API_HOST}/films/1?expand=characters&skipRows=0&pageRows=10`
    );
    expect(response).toEqual(dummyFilmResponse);
  });
});
