import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail, fetchMovies } from '../api/MovieList';

export const useGetMovieDetail = (movieNm: string) =>
    useQuery({
        queryKey: ['fetchMovieDetail', movieNm],
        queryFn: () => fetchMovieDetail(movieNm),
        staleTime: 24 * 60 * 60 * 1000
    });