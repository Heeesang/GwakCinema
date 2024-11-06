import Header from "../components/Header";
import Movie from "../components/Movie";
import MovieCategoryButton from "../components/MovieCategoryButton";
import { useGetMovieList } from "../hooks/useGetMovieList";
import { useGetBoxOffice } from "../hooks/useGetBoxOffice";
import { Link } from "react-router-dom";

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
        <div className="relative w-5/12 h-16">
          <input
            type="text"
            className="w-full h-full bg-black/40 text-white text-xl border-gray-200 border rounded-lg pl-4 pr-4 placeholder:font-semibold focus:outline-white"
            placeholder="영화 제목 검색"
          />
          <img
            src="/images/magnifyingglass.svg"
            alt="Search"
            className="absolute right-7 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-60 hover:opacity-100"
          />
        </div>
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