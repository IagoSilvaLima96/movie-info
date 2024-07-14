import { Movie } from '../entity/movie';

export const MovieInfoGatewayToken = Symbol('MovieInfoGateway');

export interface MovieInfoGateway {
  get(name: string): Promise<Movie>;
}
