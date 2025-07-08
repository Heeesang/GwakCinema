import { Link } from "react-router-dom";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieList } from "../hooks/useGetMovieList";
import { MovieType } from "../types/MovieType";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useMovieStore } from "../store/movieStore";

export default function MovieList() {
  const { data: movieList } = useGetMovieList();
  const { searchResults } = useMovieStore();
  const { allMovies, isFetching, observerRef } = useInfiniteScroll(movieList || [], searchResults);
  const moviesToDisplay: MovieType[] = searchResults?.length ? searchResults : allMovies;

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
        {!searchResults.length && (
          <div ref={observerRef} className="h-10 flex justify-center items-center">
            {isFetching && <p className="text-white">Loading more movies...</p>}
          </div>
        )}
      </div>
    </div>
  );
}