import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ children, redirectTo }) {
   const { user } = useContext(AuthContext);
   return user ? <Navigate to={redirectTo} /> : children;
}

export default AuthRoute;
