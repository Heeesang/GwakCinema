export interface MovieType {
    title: string;
    posters: string;
}

export interface MovieResponse {
    Data: [
      {
        Result: MovieType[];
      }
    ];
  }