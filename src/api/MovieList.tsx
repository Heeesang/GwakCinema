import axios from 'axios';
import { MovieType, MovieResponse, BoxOfficeResponse } from "../types/MovieType";

export const fetchMovies = async () => {
  try {
    const response = await axios.get<MovieResponse>('https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=923AT6VA7NPY9SRIQ6T2&releaseDts=20240801&releaseDte=20240905');
    console.log(response.data);
    return response.data.Data[0].Result;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};

export const fetchBoxOffice = async () => {
  try {
    const boxOfficeResponse = await axios.get<BoxOfficeResponse>('https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c9777b972b29ca8836e49e0abd905799&targetDt=20240925');
    const boxOfficeList = boxOfficeResponse.data.boxOfficeResult.dailyBoxOfficeList;
    
    const movieList = await fetchMovies();
    
    const matchedMovies = boxOfficeList.map((boxOfficeMovie) => {
      const matchedMovie = movieList.find(
        (movie) => movie.title === boxOfficeMovie.movieNm

      );
      return {
        title: boxOfficeMovie.movieNm,
        poster: matchedMovie ? matchedMovie.posters : '포스터 없음',
      };
    });

    console.log(matchedMovies);
    return matchedMovies;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};