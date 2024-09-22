export default function MovieCategoryButton() {
    return (
        <div>
            <img src='/images/koreamovies.svg' className="w-full"/>
            <div className="flex items-center absolute inset-0 bg-gradient-to-r from-black to-transparent">
                <p className="text-6xl text-[#B6B6B6] font-bold pl-10">국내영화</p>
                <img src="/images/arrow.svg" className="w-6 ml-10"/>
            </div>
        </div>
    )
}