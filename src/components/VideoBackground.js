import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice';

const VideoBackground = ({ movieId }) => {
    const dispatch = useDispatch();
    const trailerVideo =useSelector(store => store.movies?.trailerVideo); 
    console.log(trailerVideo, 'trailerVideo')
    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();
        const filterData = json.results.filter((item) => item.type === 'Trailer')
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideos();
    }, [])
    return (
        <div>
            <iframe
                src={"https://www.youtube.com/embed/" + trailerVideo?.key}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
            >

            </iframe>
        </div>
    )
}

export default VideoBackground;