// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMpGBXfKYpOzSQBmU-9tMlG5egUAMiOZo",
  authDomain: "bank-project-auth.firebaseapp.com",
  projectId: "bank-project-auth",
  storageBucket: "bank-project-auth.appspot.com",
  messagingSenderId: "840287090903",
  appId: "1:840287090903:web:1e49e86a1b6aaccb195892"
};

// Initialize Firebase
const conf = initializeApp(firebaseConfig);

export default conf
