import { Controller, Get, Query } from '@nestjs/common';
import { GetMovieInfoResponseDTO } from './dtos/get-movie-info-response.dto';
import { GetMovieInfoUsecase } from './get-movie-info.usecase';

@Controller('movie')
export class GetMovieInfoController {
  constructor(private readonly getMovieInfoUsecase: GetMovieInfoUsecase) {}

  @Get()
  async handle(@Query('name') name: string): Promise<GetMovieInfoResponseDTO> {
    return this.getMovieInfoUsecase.execute(name);
  }
}
