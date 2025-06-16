import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieList } from "../hooks/useGetMovieList";
import { MovieType } from "../types/MovieType";
import { useEffect, useRef, useState } from "react";
import { fetchMovies } from "../api/movieList";

export default function MovieList() {
  const { data: movieList, isLoading } = useGetMovieList();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState<MovieType[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const searchResults = location.state?.result;
  const moviesToDisplay: MovieType[] = searchResults?.length ? searchResults : allMovies;

  useEffect(() => {
    if (movieList && !searchResults) {
      setAllMovies(movieList);
    }
  }, [movieList, searchResults]);

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

  return (
    <div className="bg-black">
      <Header />
      <div className="max-w-screen-2xl mx-auto px-40 pt-32">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-1">
          {moviesToDisplay?.map((movie, index) => (
            <Link key={index} to={`/movie/${movie.id}`}>
              <Movie movie={movie} index={index} showIndex={false} />
            </Link>
          ))}
        </div>
        {!searchResults && (
          <div ref={observerRef} className="h-10 flex justify-center items-center">
            {isFetching && <p className="text-white">Loading more movies...</p>}
          </div>
        )}
      </div>
    </div>
  );
}