import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  const movies = useSelector((store) => store.movies);

  return movies.nowPlayingMovies && (
    <div className='bg-black'>
      <div className='mt-0md:-mt-52 relative z-20 px-12 pl-2'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/> 
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies}/> 
        <MovieList title={"Popular"} movies={movies.popularMovies}/> 
        <MovieList title={"Horror Movies"} movies={movies.nowPlayingMovies}/> 
      </div>
    </div>
  )
}

export default SecondaryContainer