import axios from "axios";
import { MovieResponse } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const searchMoviePoster = async (movieNm: string) => {
    console.log(movieNm)
    try {
      const searchResponse = await axios.get<MovieResponse>(`${baseURL}&ServiceKey=${movieListKey}&title=${movieNm}&listCount=300`);
      return searchResponse.data.Data[0].Result
    } catch (error) {
      console.error('검색 요청 에러:', error);
      return 'error';
    }
  };