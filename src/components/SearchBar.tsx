export const SearchBar = () => {
    return (
        <div className="relative w-5/12 h-16">
            <input
                type="text"
                className="w-full h-full bg-black/40 text-white text-xl border-gray-200 border rounded-lg pl-4 pr-4 placeholder:font-semibold focus:outline-white"
                placeholder="영화 제목 검색"
            />
            <img
                src="/images/magnifyingglass.svg"
                alt="Search"
                className="absolute right-7 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-60 hover:opacity-100"
            />
        </div>
    )
}