export interface MovieType {
  movieSeq: string;
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
  id: string;
  movieNm: string;
  rank: string;
  movieCd: string;
}

export interface BoxOfficeResponse {
  boxOfficeResult: {
    dailyBoxOfficeList: BoxOfficeType[]
  }
}