import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'fomantic-ui-css/semantic.css';
import './App.css';
import { Container } from 'semantic-ui-react';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import SinglePost from './pages/SinglePost.js';

function App() {
   return (
      <AuthProvider>
         <Router>
            <Container>
               <MenuBar />
               <Routes>
                  <Route path='/' element={<Home />} />{' '}
                  <Route path='/posts/:postID' element={<SinglePost />} />{' '}
                  <Route
                     path='/login'
                     element={
                        <AuthRoute redirectTo='/'>
                           <Login />
                        </AuthRoute>
                     }
                  />{' '}
                  <Route
                     path='/register'
                     element={
                        <AuthRoute redirectTo='/'>
                           <Register />
                        </AuthRoute>
                     }
                  />{' '}
               </Routes>{' '}
            </Container>{' '}
         </Router>{' '}
      </AuthProvider>
   );
}

export default App;
