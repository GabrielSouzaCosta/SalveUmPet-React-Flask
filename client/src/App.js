import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import CatsPage from './components/pages/CatsPage';
import DogsPage from './components/pages/DogsPage';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

function App() {

    const [cats, setCats] = useState([])
    const [dogs, setDogs] = useState([])

    useEffect(() => {
      fetch('animals/cats', {
        'method': 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => setCats(res))
      .catch(error => console.log(error))

    }, [])

    useEffect(() => {
      fetch('animals/dogs', {
        'method': 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.json())
      .then(res => setDogs(res))
      .catch(error => console.log(error))
      }, [])

  return (

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cats' element={<CatsPage cats={cats} />} />
          <Route path='/dogs' element={<DogsPage dogs={dogs} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
     


  )
}

export default App
