// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnAfsSPwEnYK9AHWwKnVXoSRj0fyG4jqY",
  authDomain: "react-privite-router.firebaseapp.com",
  projectId: "react-privite-router",
  storageBucket: "react-privite-router.appspot.com",
  messagingSenderId: "638766589144",
  appId: "1:638766589144:web:c994c877a5e4ea9119a3ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
