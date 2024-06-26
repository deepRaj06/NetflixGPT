import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {

    const movies = useSelector((store) => store.movies?.nowPlayingMovies);

    // if(movies == null) return; //early return
    if(!movies) return; //early return

    // we need one main movie
    const mainMovie = movies[6];
    // console.log(mainMovie);

    const { original_title, overview, id } = mainMovie;

  return (
    <div className='pt-[30%] bg-black md:pt-0'>
        {/* Netflic browse main running video title and background */}
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer