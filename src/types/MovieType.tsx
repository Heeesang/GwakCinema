export interface MovieType {
    title: string;
    posters: string;
}

export interface ApiResponse {
    Data: [
      {
        Result: MovieType[];
      }
    ];
  }