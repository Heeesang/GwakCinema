import axios from "axios";
import { MovieDetailResponse, MovieDetailType } from "../types/MovieType";

const baseURL = process.env.REACT_APP_MOVIELIST_URL
const movieListKey = process.env.REACT_APP_MOVIELIST_KEY

export const fetchMovieDetail = async (movieid: string) => {
    try {
        const searchResponse = await axios.get<MovieDetailType>(`${baseURL}/movie/${movieid}?api_key=${movieListKey}&language=ko`);
        console.log("hi")
        console.log(searchResponse.data)

        const detailData = {
            title: searchResponse.data.title,
            poster_path: searchResponse.data.poster_path,
            overview: searchResponse.data.overview,
            backdrop_path: searchResponse.data.backdrop_path,
        };

        return detailData
    } catch (error) {
        console.error('검색 요청 에러:', error);
        throw error;
    }
};