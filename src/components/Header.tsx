export default function Header() {
    return (
        <div className="flex justify-between items-center py-10 px-28">
            <img src="/images/logo.svg" className="w-52"/>
            <nav className="text-[#B6B6B6] text-xl font-bold flex space-x-10">
                <p>박스오피스</p>
                <p>검색</p>
            </nav>
        </div>
    )
}