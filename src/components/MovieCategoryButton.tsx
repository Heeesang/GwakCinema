import { CategoryPropsType } from "../types/MovieCategoryType";

export default function MovieCategoryButton({title, image}: CategoryPropsType) {
    return (
        <div className="relative overflow-hidden">
            <img src={image} className="w-full transform hover:scale-105 transition-transform duration-300"/>
            <div className="flex items-center absolute inset-0 bg-gradient-to-r from-black to-transparent pointer-events-none">
                <p className="text-6xl text-[#B6B6B6] font-bold pl-10">{title}</p>
                <img src='/images/arrow.svg' className="w-6 ml-10"/>
            </div>
        </div>
    )
}