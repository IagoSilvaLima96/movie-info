import { Module } from '@nestjs/common';
import { MovieInfoGatewayToken } from './domain/gateway/movie-info.gateway';
import { GetMovieInfoController } from './features/get-movie-info/get-movie-info.controller';
import { GetMovieInfoUsecase } from './features/get-movie-info/get-movie-info.usecase';
import { GoogleMovieInfoGateway } from './infra/gateway/google-movie-info.gateway';

const MovieInfoGatewayProvider = {
  provide: MovieInfoGatewayToken,
  useClass: GoogleMovieInfoGateway,
};

@Module({
  imports: [],
  controllers: [GetMovieInfoController],
  providers: [GetMovieInfoUsecase, MovieInfoGatewayProvider],
})
export class MovieModule {}
