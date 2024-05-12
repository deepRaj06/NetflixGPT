import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';



const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);

    // Continue...3.
    // search movie in TMDB
    // 4. 
    const searchMovieTMDB = async (movie) => {
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const json = await data.json();

        return json.results;
    }

    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);

        const gptQuery = 'Act as a Movie Recommendation system and suggest some movies for the query' + searchText.current.value + '. only give me name of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Hanuman, Golmaal'
        //1. Make an API Call to GPT API and get Movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });

        // 2. Handling error cases
        // if(!gptResults.choices) // Write error handling message

          console.log(gptResults.choices)
        //   gptResults.choices?.[0]?.message.content
        const gptMovies = gptResults.choices?.[0]?.message.content.split(",") // extracting movies inside an array
        // Results we'll get in gptMovies Andaz apna apna, Hera Pheri, Chupke Chupke, Jaane Bhi Do Yaaro, Padosan
        //   3. Pass above results(gptMovies) to movie API to show 
        //   i.e. For each movie I will search TMDB API and I will out results of that movie for all 5 movies as searched in gptQuery

        // 5. 
        // gptMovies - [ "Andaz apna apna", "Hera Pheri", "Chupke Chupke", "Jaane Bhi Do Yaaro", "Padosan" ]
        const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
        // since searchMovieTMDB is async function, hence it'll not give results instead it gives 5 promises
        // for each movie, you'll get 5 promises --> [Promise1, Promise2, Promise3, Promise4, Promise5]

        // 6. 

        const tmdbResults = await Promise.all(promiseArray); // It'll make program wait till all the 5 promises are resolved
        console.log(tmdbResults); // need to show these movies

        // 7. add these movies in addGptMovies in gptSlice, but I also want to pass gptMovies result
        dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    }

  return (
    <div className='pt-[10%] flex justify-center'>
        {/* e.preventDefault - prevent page from refreshing */}
        <form className='w-1/2  bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className='p-4 m-4 col-span-9' placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className='py-2 px-4 m-4 bg-red-700 text-white rounded-lg col-span-3' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar