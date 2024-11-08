import axios from 'axios';
import { MovieResponse, MovieDetailResponse } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const fetchMovies = async () => {
  try {
    const response = await axios.get<MovieResponse>(`${baseURL}&ServiceKey=${movieListKey}&releaseDts=20240801&listCount=300`);

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