import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { FilmDTO } from './film.dto';
import { FilmsSearchResponseDTO } from './films-search-response.dto';
import { FilmsService } from './films.service';
import { ApiQuery } from '@nestjs/swagger';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common/pipes';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('')
  @ApiQuery({
    name: 'title',
    type: String,
    required: false,
  })
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
  @ApiQuery({
    name: 'expand',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'skipRows',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'pageRows',
    type: Number,
    required: false,
  })
  async getFilm(
    @Param('id') id: number,
    @Query('expand', new DefaultValuePipe('')) expandFields: string,
    @Query('skipRows', new DefaultValuePipe(0), ParseIntPipe) skipRows: number,
    @Query('pageRows', new DefaultValuePipe(10), ParseIntPipe) pageRows: number,
  ): Promise<FilmDTO> {
    try {
      return this.filmsService.getFilm(id, skipRows, pageRows, expandFields);
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
