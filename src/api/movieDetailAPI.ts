import axios from "axios";
import { MovieDetailCreditType, MovieDetailResponse, MovieDetailType } from "../types/MovieType";
import { release } from "os";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const fetchMovieDetail = async (movieid: string) => {
    try {
        const searchResponse = await axios.get<MovieDetailType>(`${baseURL}/movie/${movieid}?api_key=${movieListKey}&language=ko`);
        console.log(searchResponse.data)
        const creditResponse = await axios.get<MovieDetailCreditType>(`${baseURL}/movie/${movieid}/credits?api_key=${movieListKey}&language=ko`);
        console.log(creditResponse.data)

        const detailData = {
            title: searchResponse.data.title,
            poster_path: searchResponse.data.poster_path,
            overview: searchResponse.data.overview,
            backdrop_path: searchResponse.data.backdrop_path,
            genres: searchResponse.data.genres,
            release_date: searchResponse.data.release_date,
            runtime: searchResponse.data.runtime,
            cast: creditResponse.data.cast,
        };

        return detailData
    } catch (error) {
        console.error('검색 요청 에러:', error);
        throw error;
    }
};