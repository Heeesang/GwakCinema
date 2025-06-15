import axios from "axios";
import { MovieResponse } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const searchMoviePoster = async (movieNm: string, page: number = 1) => {
    console.log(movieNm)
    try {
      const searchResponse = await axios.get<MovieResponse>(`${baseURL}/search/movie?api_key=${movieListKey}&language=ko&query=${movieNm}&page=${page}`);

      const movies = searchResponse.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));

      return movies
    } catch (error) {
      console.error('검색 요청 에러:', error);
      return 'error';
    }
  };