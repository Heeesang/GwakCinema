import { useState } from "react";
import { searchMoviePoster } from "../api/searchMovieAPI";

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            const result = await searchMoviePoster(searchTerm);
            console.log(result);
        } else {
            console.warn("검색어를 입력해주세요.");
        }
    };

    return (
        <div className="relative w-5/12 h-16">
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-full bg-black/40 text-white text-xl font-semibold border-gray-200 border rounded-lg pl-4 pr-4 placeholder:font-semibold focus:outline-white"
                placeholder="영화 제목 검색"
            />
            <img
                src="/images/magnifyingglass.svg"
                alt="Search"
                onClick={handleSearch}
                className="absolute right-7 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-60 hover:opacity-100"
            />
        </div>
    )
}