import Header from "../components/Header";
import Movie from "../components/Movie";
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/MovieList'; 
import { MovieType } from "../types/MovieType";

export default function Main() {
    const [movies, setMovies] = useState<MovieType[]>([]);

    useEffect(() => {
      const getMovies = async () => {
        try {
          const data = await fetchMovies();
          setMovies(data);
        } catch (error) {
          console.error('영화 데이터를 불러오는 중 에러 발생:', error);
        }
      }
      getMovies()
    }, []);
    
    return (
        <div className="bg-black px-40 h-dvh">
            <Header/>
            <h1 className="text-white mt-10 mb-8 text-4xl font-bold">박스오피스</h1>
            <div className="flex justify-between pb-52">
            <Movie movie={movies[0]}/>
            <Movie movie={movies[0]}/>
            <Movie movie={movies[0]}/>
            <Movie movie={movies[0]}/>
            <Movie movie={movies[0]}/>
            </div>
        </div>
    )
}