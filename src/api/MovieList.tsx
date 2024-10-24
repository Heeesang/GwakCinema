import axios from 'axios';
import { MovieType, MovieResponse, BoxOfficeResponse, MovieDetailType, MovieDetailResponse } from "../types/MovieType";
import { formatTitle } from '../utils/format';

let searchCallCount = 0;

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY
const boxOfficeURL = process.env.REACT_APP_BOXOFFICE_URL
const boxOfficeKey = process.env.REACT_APP_BOXOFFICE_KEY

export const fetchMovies = async () => {
  try {
    const response = await axios.get<MovieResponse>(`${baseURL}&ServiceKey=${movieListKey}&releaseDts=20240801&listCount=300`);

    // 필요한 정보만 추출해서 반환
    const movies = response.data.Data[0].Result.map((movie) => ({
      movieSeq: movie.movieSeq,
      title: movie.title,
      posters: movie.posters?.split('|')[0] || '',
    }));

    console.log(response.data.Data[0]);
    return movies;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};

export const fetchMovieDetail = async (movieNm: string, movieSeq: string) => {
  console.log(movieNm)
  try {
    const searchResponse = await axios.get<MovieDetailResponse>(`${baseURL}&ServiceKey=${movieListKey}&title=${movieNm}&movieSeq=${movieSeq}`);
    console.log("hi")
    console.log(searchResponse.data.Data[0].Result[0])

    const detailData = {
      posters: searchResponse.data.Data[0].Result[0].posters.split('|')[0],
      plots: searchResponse.data.Data[0].Result[0].plots.plot[0].plotText,
      director: searchResponse.data.Data[0].Result[0].directors.director[0].directorNm,
      stlls: searchResponse.data.Data[0].Result[0].stlls.split('|')[0],
      actors: searchResponse.data.Data[0].Result[0].actors.actor[0].actorNm
    };

    return detailData
  } catch (error) {
    console.error('검색 요청 에러:', error);
    throw error;
  }
};

// 영화 이름으로 검색하는 비동기 함수 (필요할 경우 API 추가 호출)
const searchMoviePoster = async (movieNm: string) => {
  searchCallCount++;
  console.log(movieNm)
  try {
    // 필요한 경우 추가 API 호출 또는 별도 검색 로직
    const searchResponse = await axios.get<MovieResponse>(`${baseURL}&ServiceKey=${movieListKey}&title=${movieNm}`);
    return searchResponse.data.Data[0].Result[0]?.posters || '포스터 없음';
  } catch (error) {
    console.error('검색 요청 에러:', error);
    return '포스터 없음'; // 실패 시 포스터 없음 처리
  }
};

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

    console.log(`searchMovieByName 함수 호출 횟수: ${searchCallCount}`);
    console.log(matchedMovies);
    return matchedMovies;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};
