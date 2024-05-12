import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[18%] px-6 md:px-12 absolute text-white bg-gradient-to-tr from-black'>
        <h1 className='text-2xl md:text-6xl font-bold w-1/3 text-slate-400'>{title}</h1>
        <p className='hidden md:inline-block py-6 text-lg w-1/3 text-white-400'>{overview}</p>
        <div className='my-4 md:m-0'>
            <button className='bg-white text-black py-2 md:py-4 px-3 md:px-12 text-lg rounded-lg hover:bg-opacity-80'>▶️Play</button>
            <button className='hidden md:inline-block bg-gray-700 text-white p-4 px-12 text-lg bg-opacity-50 rounded-lg mx-4 hover:bg-opacity-80'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle