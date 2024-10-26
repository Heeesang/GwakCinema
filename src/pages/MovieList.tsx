import { Link } from "react-router-dom";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieList } from "../hooks/useGetMovieList"

export default function MovieList() {
    const { data: movieList, isLoading } = useGetMovieList();

    return (
        <div className="bg-black">
            <Header />
            <div className=" max-w-screen-2xl mx-auto px-40 pt-32">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-2">
                    {movieList?.slice(0, 15).map((movie, index) => (
                        <Link to={`/movie/${encodeURIComponent(movie.title)}/${movie.movieSeq}`}>
                            <Movie key={index} movie={movie} index={index} showIndex={false} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}