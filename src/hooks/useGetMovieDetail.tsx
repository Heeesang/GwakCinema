import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail, fetchMovies } from '../api/MovieList';

export const useGetMovieDetail = (movieNm: string, movieSeq: string) =>
    useQuery({
        queryKey: ['fetchMovieDetail', movieNm, movieSeq],
        queryFn: () => fetchMovieDetail(movieNm, movieSeq),
        staleTime: 24 * 60 * 60 * 1000
    });