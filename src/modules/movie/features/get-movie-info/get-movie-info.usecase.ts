import { Inject, Injectable } from '@nestjs/common';
import {
  MovieInfoGateway,
  MovieInfoGatewayToken,
} from '../../domain/gateway/movie-info.gateway';
import { GetMovieInfoResponseDTO } from './dtos/get-movie-info-response.dto';

@Injectable()
export class GetMovieInfoUsecase {
  constructor(
    @Inject(MovieInfoGatewayToken)
    private readonly movieInfoGateway: MovieInfoGateway,
  ) {}

  async execute(name: string): Promise<GetMovieInfoResponseDTO> {
    const movie = await this.movieInfoGateway.get(name);
    return {
      name: movie.name,
      year: movie.year,
      genre: movie.genre,
      percentageOfThoseWhoLiked: movie.percentageOfThoseWhoLiked,
      streaming: movie.streaming,
    };
  }
}
