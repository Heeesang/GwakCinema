import { useQuery } from '@tanstack/react-query';
import { fetchBoxOffice } from '../api/MovieList';
import { MovieType } from '../types/MovieType';

export const useGetBoxOffice = (movieList: MovieType[]) =>
    useQuery({
        queryKey: ['BoxOffice'],
        queryFn: () => fetchBoxOffice(movieList)
    });