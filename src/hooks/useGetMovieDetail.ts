import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../api/movieDetailAPI';

export const useGetMovieDetail = (movieId: string) =>
    useQuery({
        queryKey: ['fetchMovieDetail', movieId],
        queryFn: () => fetchMovieDetail(movieId),
        staleTime: 24 * 60 * 60 * 1000
    });