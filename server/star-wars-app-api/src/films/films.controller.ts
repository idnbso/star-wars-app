import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { FilmDTO } from './film.dto';
import { FilmsSearchResponseDTO } from './films-search-response.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('')
  async getFilmsTitles(
    @Query('title') title?: string,
  ): Promise<FilmsSearchResponseDTO> {
    try {
      const titles = await this.filmsService.getFilmsTitles(title);
      return { titles };
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  @Get('/:id')
  async getFilm(
    @Param('id') id: number,
    @Query('expand') expandFields?: string,
  ): Promise<FilmDTO> {
    try {
      return this.filmsService.getFilm(id, expandFields);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
