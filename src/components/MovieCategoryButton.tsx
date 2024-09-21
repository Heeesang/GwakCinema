export default function MovieCategoryButton() {
    return (
        <div className="mx-auto max-w-screen-2xl">
            <img src='/images/koreamovies.svg' className="w-full"/>
            <div className="flex items-center absolute inset-0 bg-gradient-to-r from-black to-transparent">
                <p className="text-6xl text-[#B6B6B6] font-bold pl-32">국내영화</p>
                <img src="/images/arrow.svg" className="w-6 ml-10"/>
            </div>
        </div>
    )
}