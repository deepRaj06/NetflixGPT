import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import netflix_bg from '../assets/images/netflix_bg.jpg';

const GptSearch = () => {
  return (
    <div>
      {/* 
        GptSearchbar
        GptMovieSuggestions
       */}
       <div className='absolute -z-10'>
        <img
          className='w-screen overflow-x-hidden m-0'
          // style={{ width: "100%" }}
          src={netflix_bg}
          alt='logo' />
      </div>
       <GptSearchBar/>
       <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch