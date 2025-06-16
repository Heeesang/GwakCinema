import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { useGetMovieDetail } from "../hooks/useGetMovieDetail";
import Footer from "../components/Footer";

export default function MovieDetail() {
    const { movieId } = useParams();
    const { data } = useGetMovieDetail(movieId || '');

    const title = data?.title;
    const posterSrc = data?.poster_path
    const overview = data?.overview;

    return (
        <div className="h-screen">
            <Header />
            <div className="text-white px-40 max-w-screen-2xl mx-auto">
                <div className="absolute inset-0 h-96 w-full">
                    <img src={`https://image.tmdb.org/t/p/w200${data?.backdrop_path}`} className="object-cover h-full w-full blur-sm opacity-50" />
                </div>
                <div className="flex items-center pt-60">
                    <img src={`https://image.tmdb.org/t/p/w400${posterSrc}` || '/images/emptyPoster.svg'} className="" />
                    <div className="ml-10">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <h2 className="text-lg font-semibold mt-5">감독: {}</h2>
                        <h2 className="text-lg font-semibold">배우: {}</h2>
                    </div>
                </div>
                <div className="my-20">
                    <h1 className="font-bold text-3xl">줄거리</h1>
                    <p className="font-normal text-xl mt-5">{overview}</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}