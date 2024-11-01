import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="fixed backdrop-blur-sm left-1/2 -translate-x-1/2 mx-auto max-w-screen-2xl flex justify-between items-center py-10 px-40 top-0 w-full z-10">
            <Link to='/'>
                <img src="/images/logo.svg" className="w-40" />
            </Link>
            <nav className="text-[#B6B6B6] text-xl font-bold flex space-x-10">
                <p>박스오피스</p>
                <p>검색</p>
            </nav>
        </div>
    )
}