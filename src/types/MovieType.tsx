export interface MovieType {
  id: number;
  title: string;
  poster_path: string;
}

export interface MovieDetailType {
  title: string;
  posters: string;
  directors: {
    director: [{
      directorNm: string;
    }]
  }
  actors: {
    actor: [{
      actorNm: string;
    }]
  }
  plots: {
    plot: [{
      plotText: string;
    }]
  }
  stlls: string;
}

export interface MovieDetailResponse {
  Data: [
    {
      Result: MovieDetailType[];
    }
  ];
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