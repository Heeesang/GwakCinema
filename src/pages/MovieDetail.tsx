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
    const releaseDate = data?.release_date;
    const runtime = data?.runtime;
    const genres = data?.genres;
    const cast = data?.cast;

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
                        <h1 className="text-6xl font-bold">{title}</h1>
                        <h2 className="text-xl font-medium text-neutral-400 mt-5">개봉일: {releaseDate}</h2>
                        <h2 className="text-xl font-medium text-neutral-400">러닝타임: {runtime}분</h2>
                        <h2 className="text-xl font-medium text-neutral-400">
                            장르: {genres ? genres.map(genre => genre.name).join(', ') : '정보 없음'}
                        </h2>
                    </div>
                </div>
                <div className="my-20">
                    <h1 className="font-bold text-3xl">줄거리</h1>
                    <p className="font-normal text-xl mt-5 text-neutral-200">{overview}</p>
                </div>
                <div className="my-20">
                    <h1 className="font-bold text-3xl">출연진</h1>
                    <div className="flex mt-5 justify-between">
                        {cast && cast.length > 0 ? (
                            cast.slice(0, 6).map((actor, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                                : '/images/emptyMoviePoster.svg'
                                        }
                                        alt={actor.name}
                                        className="w-28 h-28 mb-2 rounded-full object-cover"
                                    />
                                    <p className="font-normal text-lg text-center">{actor.name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="font-normal text-xl">배우 정보 없음</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}