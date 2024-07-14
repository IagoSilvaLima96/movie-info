export class GetMovieInfoResponseDTO {
  name: string;
  genre: string;
  year: number;
  percentageOfThoseWhoLiked?: number;
  streaming: string[];
}
