import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { lang } from '../utils/languageConstants';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
const GptSearchBar = () => {
    const langKey = useSelector(store => store.config?.lang);
    const searchText = useRef(null);
    
    const searchMovieTMDB = async (movieName) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+ movieName + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    } 
    
    const handleGPTSearchCLick = async () => {
        const gptQuery = "Act as a movie recommendation system and suggest some movies for the query " + searchText.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: Jab We Met, Sholay, Don,...";
        let movieList;
        try {
            const gptResults = await openai.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo',
            });
        
             movieList = gptResults.choices?.[0]?.message?.content || "Inception, The Dark Knight, Interstellar, Titanic, The Shawshank Redemption";
        } catch {
             movieList = "Inception, The Dark Knight, Interstellar, Titanic, The Shawshank Redemption";
        }

        const gptMovies = movieList.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tabResults = await Promise.all(promiseArray);
        console.log('tabResults', tabResults);


    }
    return (
        <div className='pt-[5%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input
                    type='text'
                    className='p-4 m-4 col-span-9'
                    placeholder='what would you like to watch today?'
                    ref={searchText}
                />
                <button
                    className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
                    onClick={handleGPTSearchCLick}
                >{lang[langKey].search}</button>

            </form>
        </div>
    )
}

export default GptSearchBar