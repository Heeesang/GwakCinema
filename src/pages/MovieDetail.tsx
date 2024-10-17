import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { useGetMovieDetail } from "../hooks/useGetMovieDetail";
import { useGetMovieList } from "../hooks/useGetMovieList"
import { useState } from "react";

export default function MovieDetail() {
    const { title, movieSeq } = useParams();
    const { data } = useGetMovieDetail(title || "", movieSeq || "");

    const directorName = data?.director
    const plotText = data?.plots
    const posterSrc = data?.posters
    const stills = data?.stlls

    return (
        <div className="text-white px-40">
            <h1>{title}</h1>
            <p>Director: {directorName}</p>
            <p>Plot: {plotText}</p>
            {/* 포스터가 있을 경우에만 렌더링 */}
            {posterSrc && <img src={posterSrc} alt={`${title} Poster`} />}
            <img src={stills}/>
        </div>
    )
}