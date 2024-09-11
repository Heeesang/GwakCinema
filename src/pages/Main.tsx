import Header from "../components/Header";
import Movie from "../components/Movie";
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/MovieList'; 

export default function Main() {
    return (
        <div className="bg-black px-40 h-dvh">
            <Header/>
            <h1 className="text-white mt-10 mb-8 text-4xl font-bold">박스오피스</h1>
            <div className="flex justify-between pb-52">
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            <Movie/>
            </div>
        </div>
    )
}
