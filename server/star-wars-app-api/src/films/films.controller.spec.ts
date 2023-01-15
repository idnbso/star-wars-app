import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CharactersModule } from '../characters/characters.module';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, CharactersModule],
      controllers: [FilmsController],
      providers: [FilmsService],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
