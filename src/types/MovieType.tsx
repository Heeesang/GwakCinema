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

export interface BoxOfficeType {
  rank: string;
}

export interface BoxOfficeResponse {
  boxOfficeResult: {
    dailyBoxOfficeList: BoxOfficeType[]
  }
}