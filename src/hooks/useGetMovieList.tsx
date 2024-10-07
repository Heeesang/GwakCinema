import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../api/MovieList';

export const useGetMovieList = () =>
    useQuery({
        queryKey: ['fetchMovies'],
        queryFn: fetchMovies
    });