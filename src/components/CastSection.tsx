
interface Cast {
    profile_path: string;
    name: string;
}

interface CastSectionProps {
    cast: Cast[];
}

export default function CastSection({ cast }: CastSectionProps) {
    return (
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
    )
}
