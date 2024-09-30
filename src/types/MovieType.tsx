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
  movieNm: string;
  rank: string;
  movieCd: string;
}

export interface BoxOfficeResponse {
  boxOfficeResult: {
    dailyBoxOfficeList: BoxOfficeType[]
  }
}