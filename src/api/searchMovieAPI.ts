import axios from "axios";
import { MovieResponse } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const searchMoviePoster = async (movieNm: string) => {
    console.log(movieNm)
    try {
      // 필요한 경우 추가 API 호출 또는 별도 검색 로직
      const searchResponse = await axios.get<MovieResponse>(`${baseURL}&ServiceKey=${movieListKey}&title=${movieNm}`);
      return searchResponse.data.Data[0].Result
    } catch (error) {
      console.error('검색 요청 에러:', error);
      return 'error';
    }
  };