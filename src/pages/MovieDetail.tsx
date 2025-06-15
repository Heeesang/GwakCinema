import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieDetail } from "../hooks/useGetMovieDetail";
import { useGetMovieList } from "../hooks/useGetMovieList"
import { useState } from "react";

export default function MovieDetail() {
    const { title, movieSeq } = useParams();
    const decodedTitle = decodeURIComponent(title || "");
    const { data } = useGetMovieDetail(decodedTitle, movieSeq || "");

    const directorName = data?.director
    const plotText = data?.plots
    const posterSrc = data?.posters
    const stills = data?.stlls
    const actors = data?.actors

    return (
        <div>
            <Header />
            <div className="text-white px-40 max-w-screen-2xl mx-auto relative">
                <div className="absolute inset-0 h-96 w-ful">
                    <img src={stills} className="object-cover h-full w-full blur-sm opacity-50" />
                </div>
                <div className="flex items-center pt-60">
                    <img src={`https://image.tmdb.org/t/p/w500${posterSrc}` || '/images/emptyPoster.svg'} className="" />
                    <div className="ml-10">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <h2 className="text-lg font-semibold mt-5">감독: {directorName}</h2>
                        <h2 className="text-lg font-semibold">배우: {actors}</h2>
                    </div>
                </div>
                <div className="mt-20">
                    <h1 className="font-bold text-3xl">줄거리</h1>
                    <p className="font-normal text-xl mt-5">{plotText}</p>
                </div>
            </div>
        </div>
    )
}