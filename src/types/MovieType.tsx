export interface MovieType {
  movieSeq: string;
  title: string;
  posters: string;
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
      actorNM: string;
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