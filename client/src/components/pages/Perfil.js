import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';

export default function Perfil() {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/api/profile', {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} }).then(res => setUser(res.data))
    }, [])


  return (
    <div className='vh-100'>
        <Navbar />

        <div className='d-flex flex-column h-100 align-items-center pt-4'>
          <img src="/assets/images/blank_profile.png" className='border' width={"300px"} alt="profile photo"></img>
          <label htmlFor='name'>Nome:</label>
          <h1 className='' id='name'>{user.name}</h1>
          <label htmlFor='email'>Email:</label>
          <h2 className='' id='email'>{user.email}</h2>
          <h3 className=''>Meus pets para adoção</h3>
          <h3>Meus Interesses</h3>

        </div>

        
    </div>
  )
}
