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
  
        let poster = '포스터 없음'; // 기본값 설정

        // 매칭되지 않는 경우만 searchMoviePoster 호출
        if (!matchedMovie) {
          const searchResults = await searchMoviePoster(boxOfficeMovie.movieNm);
          
          // 배열인지 확인하고 포스터 정보 추출
          if (Array.isArray(searchResults) && searchResults.length > 0) {
            poster = searchResults[0].posters.split('|')[0] || '포스터 없음';
          }
        } else {
          poster = matchedMovie.posters;
        }

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
  