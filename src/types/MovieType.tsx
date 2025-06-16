export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieDetailType {
  title: string;
  poster_path: string;
  overview: string;
  backdrop_path: string;
}

export interface MovieDetailResponse {
  results: MovieDetailType;
}

export interface MovieResponse {
  results: MovieType[];
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