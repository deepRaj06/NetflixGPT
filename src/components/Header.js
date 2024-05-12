import React, { useEffect } from 'react'
import netflix_logo from '../assets/images/netflix_logo.png';
import netflix_user_icon from '../assets/images/netflix_user_icon.png';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGptSearchView } from '../utils/gptSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log("user_Header", user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };

  const handleGptSearchClick = () => {
    // toggle GptSearch
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    // console.log('lang', e.target.value);
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("userBody", user.displayName)

        // User is signed in (whether form signedin or signup),
        //   const uid = user.uid;
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse")
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        // ...
      }
    });
    // unsubscribe when the component mounts
    return () => unsubscribe();
  }, [])
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex justify-between'>
      <img
        className='w-44'
        src={netflix_logo}
        alt='logo'
      />
      {
        user && <div className='flex p-2'>
          {showGptSearch && <select className='p-2 px-3 m-2 bg-gray-900 text-white rounded-lg' onChange={handleLanguageChange}>
            {
              SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
              ))
            }
          </select>}
          <button className='py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Home" : "GPT Search"}</button>
          <img
            className='w-12 h-12 '
            alt='usericon'
            // src={netflix_user_icon}
            src={user?.photoURL}
          />

          <button onClick={handleSignOut} className='font-bold text-white'>
            Sign Out
          </button>
        </div>
      }


    </div>
  )
}

export default Header