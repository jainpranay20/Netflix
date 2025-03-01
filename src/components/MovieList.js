import { useRef, useState } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
    const scrollRef = useRef(null);
    const [scrolling, setScrolling] = useState(null);

    const startScrolling = (direction) => {
        if (scrolling) return; // Prevent multiple intervals

        const speed = 5; // Adjust scroll speed
        const interval = setInterval(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollLeft += direction === "right" ? speed : -speed;
            }
        }, 20);

        setScrolling(interval);
    };

    const stopScrolling = () => {
        if (scrolling) {
            clearInterval(scrolling);
            setScrolling(null);
        }
    };

    return (
        <div className="px-4 py-2 relative">
            <h1 className="text-4xl font-bold py-1 text-white">{title}</h1>
            <div className="relative">
                {/* Invisible hover zones */}
                <div
                    className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black opacity-0 hover:opacity-20 transition-opacity"
                    onMouseEnter={() => startScrolling("left")}
                    onMouseLeave={stopScrolling}
                />
                <div
                    className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black opacity-0 hover:opacity-20 transition-opacity"
                    onMouseEnter={() => startScrolling("right")}
                    onMouseLeave={stopScrolling}
                />

                {/* Scrollable movie list */}
                <div ref={scrollRef} className="flex overflow-x-scroll scrollbar-hide" style={{
                    overflowX: "scroll",
                    scrollbarWidth: "none",  /* Firefox */
                    msOverflowStyle: "none"  /* IE, Edge */
                }} >
                    <div className="flex">
                        {movies?.map((item) => (
                            <MovieCard key={item.id} posterPath={item.poster_path} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieList;
