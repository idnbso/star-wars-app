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
      const results = await this.filmsService.getFilmsTitles(title);
      return { results };
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  @Get('/:id')
  async getFilm(
    @Param('id') id: number,
    @Query('expand') expandFields?: string,
    @Query('skipRows') skipRows?: number,
    @Query('pageRows') pageRows?: number,
  ): Promise<FilmDTO> {
    try {
      return this.filmsService.getFilm(id, skipRows, pageRows, expandFields);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
