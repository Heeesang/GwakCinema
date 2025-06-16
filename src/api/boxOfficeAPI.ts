import axios from "axios";
import { formatTitle } from "../utils/format";
import { BoxOfficeResponse, MovieType } from "../types/MovieType";
import { searchMoviePoster } from "./searchMovieAPI";

const boxOfficeURL = process.env.REACT_APP_BOXOFFICE_URL
const boxOfficeKey = process.env.REACT_APP_BOXOFFICE_KEY

const getTodayDate = (): string => {
  const today = new Date();
  const kstDate = new Date(today.getTime() + 9 * 60 * 60 * 1000);
  kstDate.setDate(kstDate.getDate() - 10);
  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

export const fetchBoxOffice = async (movieList: MovieType[]) => {
    try {
      const boxOfficeResponse = await axios.get<BoxOfficeResponse>(`${boxOfficeURL}?key=${boxOfficeKey}&targetDt=${getTodayDate()}`);
      const boxOfficeList = boxOfficeResponse.data.boxOfficeResult.dailyBoxOfficeList;
      console.log(movieList)
      console.log(getTodayDate())

      const matchedMovies = await Promise.all(boxOfficeList.map(async (boxOfficeMovie) => {
        const matchedMovie = movieList.find(
          (movie) => formatTitle(movie.title) === formatTitle(boxOfficeMovie.movieNm)
        );
  
        let poster = '';

        if (!matchedMovie) {
          const searchResults = await searchMoviePoster(boxOfficeMovie.movieNm);
          
          if (Array.isArray(searchResults) && searchResults.length > 0) {
            poster = searchResults[0].poster_path
          }
        } else {
          poster = matchedMovie.poster_path;
        }

        return {
          id: matchedMovie?.id || 0,
          title: boxOfficeMovie.movieNm,
          poster_path: poster,
        };
      }));
  
      console.log(matchedMovies);
      return matchedMovies;
    } catch (error) {
      console.error('API 요청 에러:', error);
      throw error;
    }
  };
  