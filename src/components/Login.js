import React, { useState } from 'react'
import Header from './Header'
import netflix_bg_1 from '../assets/images/netflix_bg_1.jpg';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true)

  const toggleSignInForm = () => {
      setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <div className='absolute'>
        <Header/>
        <img
        className='w-full'
          // style={{ width: "100%" }}
          src={netflix_bg_1}
          alt='logo' />    
      </div>
      <form className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80'/>}
        <input type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80'/>
        <input type='password' placeholder='Password' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80'/>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already registered? Sign In Now."}</p>
      </form>
    </div>
   
  )
}

export default Login