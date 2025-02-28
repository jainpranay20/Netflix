import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    return (
        <div className='px-4 py-2'>
            <div>
                <h1 className='text-4xl font-bold py-1 text-white'>{title}</h1>
            </div>
            <div className='flex overflow-x-scroll'>
                <div className='flex'>
                    {movies && movies.map((item) => (
                        <MovieCard key={item.id} posterPath={item.poster_path} />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default MovieList
