import { Test, TestingModule } from '@nestjs/testing';
import { CharactersModule } from '../characters/characters.module';
import { FilmsService } from './films.service';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { CharacterDTO } from 'src/characters/character.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  const API_HOST = 'https://swapi.dev/api';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, CharactersModule],
      providers: [FilmsService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get films titles', async () => {
    const mock = jest.spyOn(service['http'], 'get').mockReturnValue(
      of({
        data: { results: [{ title: 'test', url: 'http://test.com/1/' }] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }),
    );

    const titles = await service.getFilmsTitles('test');

    expect(mock).toHaveBeenCalledWith(`${API_HOST}/films?search=test`);
    expect(titles).toEqual([{ id: '1', title: 'test' }]);
  });

  it('should get film with characters', async () => {
    const httpGetMock = jest.spyOn(service['http'], 'get').mockReturnValue(
      of({
        data: {
          title: 'A New Test',
          episode_id: 4,
          director: 'John Test',
          producer: 'Mike Test',
          release_date: '123BBY',
          characters: [`${API_HOST}/1/`, `${API_HOST}/2/`],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      }),
    );

    const dummyCharacters: CharacterDTO[] = [
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
        eyeColor: 'blue',
        gender: 'male',
        birthYear: '1999BBY',
      },
    ];
    const getCharactersMock = jest
      .spyOn(service['expandableFieldsDataFactory'], 'characters')
      .mockResolvedValue(dummyCharacters);

    const film = await service.getFilm(1, 0, 10, 'characters');

    expect(httpGetMock).toHaveBeenCalledWith(`${API_HOST}/films/1`);
    expect(getCharactersMock).toHaveBeenCalledWith(['1', '2'], 0, 10);
    expect(film).toEqual({
      title: 'A New Test',
      episodeId: 4,
      director: 'John Test',
      producer: 'Mike Test',
      releaseDate: '123BBY',
      characters: dummyCharacters,
      totalCharacters: 2,
    });
  });
});
