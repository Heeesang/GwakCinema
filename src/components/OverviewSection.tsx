
interface OverviewSectionProps {
    overview: string;
}

export default function OverviewSection({ overview }: OverviewSectionProps) {
    return (
        <div className="my-20">
            <h1 className="font-bold text-3xl">줄거리</h1>
            <p className="font-normal text-xl mt-5 text-neutral-200">{overview}</p>
        </div>
    )
}
