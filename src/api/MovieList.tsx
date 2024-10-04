import axios from 'axios';
import { MovieType, MovieResponse, BoxOfficeResponse } from "../types/MovieType";

const formatTitle = (title: string) => {
  return title
    .replace(/!HS/g, "")
    .replace(/!HE/g, "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/ +/g, " ")
    .toLowerCase();
};

let searchCallCount = 0;

export const fetchMovies = async () => {
  try {
    const response = await axios.get<MovieResponse>('https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=923AT6VA7NPY9SRIQ6T2&releaseDts=20240801&listCount=300');
    console.log(response.data.Data[0].Result)
    return response.data.Data[0].Result;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};

// 영화 이름으로 검색하는 비동기 함수 (필요할 경우 API 추가 호출)
const searchMovieByName = async (movieNm: string) => {
  searchCallCount++;
  console.log(movieNm)
  try {
    // 필요한 경우 추가 API 호출 또는 별도 검색 로직
    const searchResponse = await axios.get<MovieResponse>(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=923AT6VA7NPY9SRIQ6T2&title=${movieNm}`);
    return searchResponse.data.Data[0].Result[0]?.posters || '포스터 없음';
  } catch (error) {
    console.error('검색 요청 에러:', error);
    return '포스터 없음'; // 실패 시 포스터 없음 처리
  }
};

export const fetchBoxOffice = async () => {
  try {
    // 박스오피스 영화 목록 가져오기
    const boxOfficeResponse = await axios.get<BoxOfficeResponse>('https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=c9777b972b29ca8836e49e0abd905799&targetDt=20240925');
    const boxOfficeList = boxOfficeResponse.data.boxOfficeResult.dailyBoxOfficeList;

    // 영화 리스트 가져오기
    const movieList = await fetchMovies();

    // 매칭되지 않는 경우 추가 검색 처리
    const matchedMovies = await Promise.all(boxOfficeList.map(async (boxOfficeMovie) => {
      const matchedMovie = movieList.find(
        (movie) => formatTitle(movie.title) === formatTitle(boxOfficeMovie.movieNm)
      );

      const poster = matchedMovie 
        ? matchedMovie.posters
        : await searchMovieByName(boxOfficeMovie.movieNm);

      return {
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
