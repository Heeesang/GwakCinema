import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/movieList';

export const useGetMovieList = () =>
    useQuery({
        queryKey: ['fetchMovies'],
        queryFn: () => fetchMovies(1),
        staleTime: 24 * 60 * 60 * 1000
});