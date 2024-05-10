// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlsYEweJxWd5-e0v8t6hH-GWhaKsY-YDA",
  authDomain: "netflixgpt-41422.firebaseapp.com",
  projectId: "netflixgpt-41422",
  storageBucket: "netflixgpt-41422.appspot.com",
  messagingSenderId: "427233199191",
  appId: "1:427233199191:web:2641352642ffd331ba4f12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); // calling it once so that auth can be exported at multiple places
