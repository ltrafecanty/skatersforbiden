import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'fomantic-ui-css/semantic.css';
import './App.css';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';

function App() {
   return (
      <Router>
         <Container>
            <MenuBar />
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Register />} />
            </Routes>
         </Container>
      </Router>
   );
}

export default App;
