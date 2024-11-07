import Header from "../components/Header";
import Movie from "../components/Movie";
import MovieCategoryButton from "../components/MovieCategoryButton";
import { useGetMovieList } from "../hooks/useGetMovieList";
import { useGetBoxOffice } from "../hooks/useGetBoxOffice";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export default function Main() {
  const { data: movieList, isLoading } = useGetMovieList();
  const { data: boxOfficeData } = useGetBoxOffice(movieList || [], isLoading)

  return (
    <div className="bg-black">
      <Header />
      <div className="flex flex-col justify-center items-center h-dvh">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute object-cover z-0 w-full h-full filter brightness-50"
        >
          <source src="/video/moviebg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img src="/images/logo.svg" className="w-5/12 my-8" />
        <SearchBar/>
      </div>
      <div className=" max-w-screen-2xl mx-auto px-40 my-20">
        <h1 className="text-white mb-6 text-3xl font-bold">박스오피스</h1>
        <div className="flex justify-between gap-4">
          {boxOfficeData?.slice(0, 5).map((movie, index) => (
            <Movie key={index} movie={movie} index={index} />
          ))}
        </div>
      </div>
      <div className="pb-32 px-40 max-w-screen-2xl mx-auto">
        <Link to='/movieList'>
          <MovieCategoryButton />
        </Link>
      </div>
    </div>
  )
}