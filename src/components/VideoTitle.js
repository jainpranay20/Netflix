import React from 'react'

const VideoTitle = ({ title, overview }) => {
    
    return (
        <div className='pt-36 px-10'>
            <h1 className='text-6xl font-bold'>{title}</h1>
            <p className='py-6 text-lg w-1/4'>{overview}</p>
            <div>
                <button className='bg-gray-300 text-black px-12 p-4 text-lg rounded-lg'>▶ Play</button>
                <button className='mx-2 bg-gray-300 text-black px-12 p-4 text-lg rounded-lg'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle