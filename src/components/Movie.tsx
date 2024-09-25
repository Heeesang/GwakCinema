import { MovieType } from "../types/MovieType";

interface MovieProps {
    movie: MovieType;
    index: number;
  }

export default function Movie({movie, index}: MovieProps) {
    return (
        <div className="bg-gray-300 rounded-xl h-80 w-56 hover:scale-110 transform transition duration-300 flex items-center justify-center overflow-hidden">
            <img
                src={movie?.posters?.split('|')[0]}
                alt="Movie Poster"
                className="object-cover w-full h-full"
            />
            <p className="absolute left-0 bottom-0 m-3 text-black text-8xl font-bold text-stroke">{index + 1}</p>
        </div>
    )
}