import { useQuery } from '@tanstack/react-query';
import { MovieType } from '../types/MovieType';
import { fetchBoxOffice } from '../api/boxOfficeAPI';

export const useGetBoxOffice = (movieList: MovieType[], isLoading: boolean) =>
    useQuery({
        queryKey: ['BoxOffice'],
        queryFn: () => fetchBoxOffice(movieList),
        staleTime: 24 * 60 * 60 * 1000,
        enabled: !isLoading
});