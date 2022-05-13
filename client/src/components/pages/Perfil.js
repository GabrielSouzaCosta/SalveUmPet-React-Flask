import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';

export default function Perfil() {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/profile', {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} })
    })


  return (
    <div className='vh-100'>
        <Navbar />
        Perfil
    </div>
  )
}
