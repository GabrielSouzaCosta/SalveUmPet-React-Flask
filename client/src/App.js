import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import CatsPage from './components/pages/CatsPage';
import DogsPage from './components/pages/DogsPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import CatPost from './components/pages/CatPost';
import NewPost from './components/pages/NewPost';

function App() {

  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cats' element={<CatsPage />} />
          <Route path='/dogs' element={<DogsPage />} />
          <Route path='/cats/:id' element={<CatPost />} />
          <Route path='/new_post' element={<NewPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
     


  )
}

export default App
