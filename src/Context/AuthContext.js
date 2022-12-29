import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const UserContext = createContext();
const auth = getAuth(app);
const AuthContext = ({children}) => {
  const [user, setUser] = useState({});
  const [authLoading, setAuthLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // create user
  const createUser = (email, password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // update user
  const updateUser = (name, photo) => {
    setAuthLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    })
  }

  // signin user
  const signInUser = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // reset password
  const resetPassword = (email) => {
    setAuthLoading(true);
    return sendPasswordResetEmail(auth, email);
  }

  // get the currently logged in user
  useEffect( ()=>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setAuthLoading(false);
    })
    return () => {
      unsubscribe();
    }
  }, [])

  //google user
  const googleUser = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  //facebook user
  const facebookUser = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, facebookProvider);
  }

  // signOut user
  const signOutUser = () => {
    setAuthLoading(true);
    return signOut(auth);
  }


  const authInfo = {user, authLoading, createUser, updateUser, signInUser, resetPassword, googleUser, facebookUser, signOutUser};
  
  return (
    <UserContext.Provider value={authInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;