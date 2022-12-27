import React, { createContext } from 'react';
import { getAuth } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const UserContext = createContext();
const auth = getAuth(app);
const AuthContext = ({children}) => {


  const authInfo = {};
  return (
    <UserContext.Provider value={authInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthContext;