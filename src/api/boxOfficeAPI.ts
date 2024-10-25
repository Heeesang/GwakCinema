import axios from "axios";
import { formatTitle } from "../utils/format";
import { BoxOfficeResponse, MovieType } from "../types/MovieType";
import { searchMoviePoster } from "./searchMovieAPI";

const boxOfficeURL = process.env.REACT_APP_BOXOFFICE_URL
const boxOfficeKey = process.env.REACT_APP_BOXOFFICE_KEY

export const fetchBoxOffice = async (movieList: MovieType[]) => {
    try {
      // 박스오피스 영화 목록 가져오기
      const boxOfficeResponse = await axios.get<BoxOfficeResponse>(`${boxOfficeURL}?key=${boxOfficeKey}&targetDt=20240925`);
      const boxOfficeList = boxOfficeResponse.data.boxOfficeResult.dailyBoxOfficeList;
      console.log(movieList)
      // 매칭되지 않는 경우 추가 검색 처리
      const matchedMovies = await Promise.all(boxOfficeList.map(async (boxOfficeMovie) => {
        const matchedMovie = movieList.find(
          (movie) => formatTitle(movie.title) === formatTitle(boxOfficeMovie.movieNm)
        );
  
        const poster = matchedMovie 
          ? matchedMovie.posters
          : await searchMoviePoster(boxOfficeMovie.movieNm);
  
        return {
          movieSeq: matchedMovie?.movieSeq || "",
          title: boxOfficeMovie.movieNm,
          posters: poster,
        };
      }));
  
      console.log(matchedMovies);
      return matchedMovies;
    } catch (error) {
      console.error('API 요청 에러:', error);
      throw error;
    }
  };
  