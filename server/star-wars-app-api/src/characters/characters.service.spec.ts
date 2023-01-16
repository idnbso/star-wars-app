import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  const API_HOST = 'https://swapi.dev/api';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CharactersService],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get characters', async () => {
    const dummyCharacters = [
      {
        name: 'Test1',
        hair_color: 'blonde',
        eye_color: 'blue',
        gender: 'male',
        birth_year: 'unknown',
      },
      {
        name: 'Test2',
        hair_color: 'brown',
        eye_color: 'green',
        gender: 'male',
        birth_year: '2000BBY',
      },
    ];
    const mock = jest
      .spyOn(service['http'], 'get')
      .mockReturnValueOnce(
        of({
          data: dummyCharacters[0],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      )
      .mockReturnValueOnce(
        of({
          data: dummyCharacters[1],
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
        }),
      );

    const characters = await service.getCharacters(['1', '2']);

    expect(mock).toHaveBeenNthCalledWith(1, `${API_HOST}/people/1`);
    expect(mock).toHaveBeenNthCalledWith(2, `${API_HOST}/people/2`);
    expect(characters).toEqual([
      {
        name: 'Test1',
        hairColor: 'blonde',
        eyeColor: 'blue',
        gender: 'male',
        birthYear: 'unknown',
      },
      {
        name: 'Test2',
        hairColor: 'brown',
        eyeColor: 'green',
        gender: 'male',
        birthYear: '2000BBY',
      },
    ]);
  });
});
