import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ element: Component, ...rest }) {
   const { user } = useContext(AuthContext);
   return (
      <Route
         {...rest}
         render={(props) =>
            user ? <Navigate to='/' /> : <Component {...props} />
         }
      />
   );
}

export default AuthRoute;
