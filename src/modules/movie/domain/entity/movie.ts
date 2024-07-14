export class Movie {
  constructor(
    readonly name: string,
    readonly year: number,
    readonly genre: string,
    readonly streaming: string[],
    readonly percentageOfThoseWhoLiked: number,
  ) {}
}
