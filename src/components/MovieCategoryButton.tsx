export default function MovieCategoryButton() {
    return (
        <div className="mx-auto max-w-screen-2xl">
            <img src='/images/koreamovies.svg' className="w-full"/>
            <div className="flex items-center absolute inset-0 bg-gradient-to-r from-black to-transparent">
                <h1 className="text-6xl text-gray-400 font-bold pl-32">국내영화</h1>
            </div>
        </div>
    )
}