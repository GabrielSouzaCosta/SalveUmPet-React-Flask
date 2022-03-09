import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import CatsPage from './components/pages/CatsPage';
import DogsPage from './components/pages/DogsPage';
import Login from './components/pages/Login';

function App() {

  return (
    <div>

      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cats' element={<CatsPage />} />
          <Route path='/dogs' element={<DogsPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  )
}

export default App
