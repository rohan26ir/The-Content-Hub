// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzh_S64oI--5bhH8md16LxuTl-SdAzxsk",
  authDomain: "content-hub-24.firebaseapp.com",
  projectId: "content-hub-24",
  storageBucket: "content-hub-24.firebasestorage.app",
  messagingSenderId: "365167843786",
  appId: "1:365167843786:web:1e83955f3aa0420e71d733"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export default auth;