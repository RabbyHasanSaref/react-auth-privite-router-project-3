import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const Context = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const provider = new GoogleAuthProvider();

  // create user 
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // login user 
  const loginUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // google with user create 
  const googleUser = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }

  // forget password 
  const forgetPassword = (email) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  // user logout 
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }


  // observer on the Auth 
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('obsever state user', currentUser);
      setUser(currentUser);
      setLoading(false)
    })
    return () => {
      unSubscribe();
    }
  }, [])

  const authInfo = {
    user,
    createUser,
    loginUser,
    forgetPassword,
    logOut,
    loading,
    googleUser
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default Context;