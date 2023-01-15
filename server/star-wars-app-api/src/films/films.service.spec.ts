import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from '../characters/characters.service';
import { CharactersModule } from '../characters/characters.module';
import { FilmsService } from './films.service';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, CharactersModule],
      providers: [FilmsService, CharactersService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
