import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieList } from "../hooks/useGetMovieList"

export default function MovieList() {
    const { data: movieList, isLoading } = useGetMovieList();

    return (
        <div className="bg-black">
            <Header/>
            <div className=" max-w-screen-2xl mx-auto px-40 pt-32">
                <div className="grid grid-cols-4 justify-between gap-6">
                    {movieList?.slice(0, 15).map((movie, index) => (
                        <Movie key={index} movie={movie} index={index} showIndex={false} />
                    ))}
                </div>
            </div>
        </div>
    )
}