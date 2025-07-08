
import { useState, useEffect, useRef } from 'react';
import { fetchMovies } from '../api/movieList';
import { MovieType } from '../types/MovieType';

export const useInfiniteScroll = (initialMovies: MovieType[], searchResults: MovieType[]) => {
    const [page, setPage] = useState(1);
    const [allMovies, setAllMovies] = useState<MovieType[]>(initialMovies);
    const [isFetching, setIsFetching] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (initialMovies && !searchResults) {
            setAllMovies(initialMovies);
        }
    }, [initialMovies, searchResults]);

    useEffect(() => {
        if (page === 1) return;

        const loadMoreMovies = async () => {
            setIsFetching(true);
            try {
                const newMovies = await fetchMovies(page);
                setAllMovies((prev) => [...prev, ...newMovies]);
            } catch (error) {
                console.error('Failed to fetch more movies:', error);
            } finally {
                setIsFetching(false);
            }
        };

        loadMoreMovies();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && !searchResults) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.8 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, [isFetching, searchResults]);

    return { allMovies, isFetching, observerRef };
};
