import axios from 'axios';
import { MovieResponse } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const fetchMovies = async (page: number) => {
  try {
    const response = await axios.get<MovieResponse>(
      `${baseURL}/movie/popular?api_key=${movieListKey}&page=${page}&language=ko`
    );
    
    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    }));

    console.log(response.data);
    return movies;
  } catch (error) {
    console.error('API 요청 에러:', error);
    throw error;
  }
};