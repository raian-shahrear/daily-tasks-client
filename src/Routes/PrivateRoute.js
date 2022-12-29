import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';

const PrivateRoute = ({children}) => {
  const {user, authLoading} = useContext(UserContext);
  const location = useLocation();

  if(authLoading){
    return (
      <div className='h-[680px] px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex justify-center items-center'>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      </div>
    )
  }

  if(user){
    return children;
  }else{
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;