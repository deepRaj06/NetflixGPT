import React, { useRef, useState } from 'react'
import Header from './Header'
import netflix_bg_1 from '../assets/images/netflix_bg_1.jpg';
import { checkValidData } from '../utils/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import netflix_user_icon from '../assets/images/netflix_user_icon.png';
import { PHOTO_URL } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null); // creating refernce for email
  const password = useRef(null);
  const dispatch = useDispatch();

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = () => {

    // consoling what is there in email and password
    // console.log(email, password);
    // console.log(email.current.value, password.current.value);

    // Validate the form data
    const message = checkValidData(isSignInForm, !isSignInForm && name.current.value, email.current.value, password.current.value);
    // console.log(message);
    setErrorMessage(message);

    if(message) return

    //1.  SignIn/ SignUp Logic
    //2.  Firstly we'll check whether it is signin or signup condition

    if(!isSignInForm){
      // 3. signup logic
      // auth - coming form utils
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value, photoURL: PHOTO_URL
          }).then(() => {
            // once Profile updated!, then navigate
            const { uid, email, displayName, photoURL } = auth.currentUser; // updated user info as above user doesn't have updated info
            dispatch(addUser({ uid: uid, email: email, displayName:displayName, photoURL: photoURL }))              
            // navigate("/browse")
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.Message)
            // ...
          });
          console.log("user", user);
          // navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error", errorMessage);
          setErrorMessage(errorCode+ "-" + errorMessage)
          // ..
        });

    }else{
      // 4. signin logic
      signInWithEmailAndPassword(auth,email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("signin_user", user);
          // navigate("/browse")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-" + errorMessage)

        });

    }
  }
  return (
    <div>
      <div className='absolute'>
        <Header />
        <img
          className='w-full'
          // style={{ width: "100%" }}
          src={netflix_bg_1}
          alt='logo' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80' />}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80' />
        <input  ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-black border-2 bg-opacity-80' />
        <p className='text-red-600 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already registered? Sign In Now."}</p>
      </form>
    </div>

  )
}

export default Login