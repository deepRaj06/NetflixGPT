import React from 'react'
import netflix_logo from '../assets/images/netflix_logo.png';
const Header = () => {
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
        <img 
            className='w-40'
            src={netflix_logo}
            alt='logo'/>
    </div>
  )
}

export default Header