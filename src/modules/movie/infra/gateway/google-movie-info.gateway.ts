import { Injectable } from '@nestjs/common';
import { HttpClientService } from 'src/modules/shared/services/http-client/http-client.service';
import { Movie } from '../../domain/entity/movie';
import { MovieInfoGateway } from '../../domain/gateway/movie-info.gateway';
import { load } from 'cheerio';

@Injectable()
export class GoogleMovieInfoGateway implements MovieInfoGateway {
  constructor(private readonly httpClientService: HttpClientService) {}

  async get(name: string): Promise<Movie> {
    const movieHtml = await this.getMovieRequest(name);
    const percentageOfThoseWhoLiked =
      this.getPercentageOfThoseWhoLiked(movieHtml);
    return new Movie(
      name,
      1996,
      'action',
      ['Netflix'],
      percentageOfThoseWhoLiked,
    );
  }

  private async getMovieRequest(name: string) {
    const url = `https://www.google.com/search?q=${name} movie`;
    const data = await this.httpClientService.get(url, {
      headers: {
        'User-Agent': this.getUserAgent(),
      },
    });
    return data.toString();
  }

  private getUserAgent(): string {
    return 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';
  }

  private getPercentageOfThoseWhoLiked(html: string) {
    try {
      const content = load(html);
      const ratingDiv = content('.a19vA');
      const element = ratingDiv.children()[0];
      const ratingText = element.children[0]['data'];
      const note = ratingText.split('%')[0];
      return parseInt(note);
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
