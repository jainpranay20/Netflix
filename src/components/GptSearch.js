import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { IMG_BACKGROUND } from '../utils/constants'

const GptSearch = () => {
    return (
        <div>
            <div className='fixed -z-10'>
                <img src={IMG_BACKGROUND}
                    alt="logo"
                />
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch