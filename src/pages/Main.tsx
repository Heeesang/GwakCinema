import Header from "../components/Header";
import Movie from "../components/Movie";
import React, { useEffect, useState } from 'react';
import { fetchBoxOffice, fetchMovies } from '../api/MovieList';
import { MovieType } from "../types/MovieType";
import MovieCategoryButton from "../components/MovieCategoryButton";

export default function Main() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
      } catch (error) {
        console.error('영화 데이터를 불러오는 중 에러 발생:', error);
      }
    }
    const getBoxOffice = async () => {
      try {
        const data = await fetchBoxOffice();
        setMovies(data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    }
    getMovies()
    getBoxOffice()
  }, []);

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
          <source src="https://res.cloudinary.com/dmeioikgw/video/upload/v1726996102/moviebg_lww06m.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img src="/images/logo.svg" className="w-5/12 my-8" />
        <input
          className="w-5/12 h-16 bg-black/40 text-white text-xl border-gray-200 border rounded-lg placeholder: font-semibold pl-4 focus: outline-white"
          placeholder="영화제목 검색"
        />
      </div>
      <div className=" max-w-screen-2xl mx-auto px-40 my-20">
        <h1 className="text-white mb-6 text-3xl font-bold">박스오피스</h1>
        <div className="flex justify-between">
          {movies.slice(0, 5).map((movie, index) => (
            <Movie key={index} movie={movie} index={index} />
          ))}
        </div>
      </div>
      <div className="pb-32 px-40 max-w-screen-2xl mx-auto">
        <MovieCategoryButton />
      </div>
    </div>
  )
}