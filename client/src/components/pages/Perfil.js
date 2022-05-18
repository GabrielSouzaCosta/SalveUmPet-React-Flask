import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';

export default function Perfil() {
    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        axios.get('/api/profile', {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} }).then(res => setUser(res.data) );
    }, [])

    function handleUploadChange(e) {
      setPhoto(e.target.files[0]);
      console.log(photo)
    }

    async function uploadPhoto(e) {
        var formData = new FormData();
        formData.append("profile_photo", photo);
        await axios.post(`/api/upload_image/${user.id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") }} )
    }



  return (
    <div className='vh-100'>
        <Navbar />

        <div className='d-flex flex-column h-100 align-items-center pt-4'>
        {(user.photo) ?
                  <input type="image" src={user.photo} className='border mb-2'  height={"300px"} alt="profile" data-bs-toggle="modal" data-bs-target="#photoModal" /> :
                  <input type="image" src="/assets/images/blank_profile.png" className='border mb-2' height={"300px"} alt="profile" data-bs-toggle="modal" data-bs-target="#photoModal" ></input>
                }
          
          <div className='d-flex flex-row align-items-center text-justify'>
            <label className='h2' htmlFor='name'>Nome:</label>
            <h2 className='' id='name'>{user.name}</h2>
          </div>
          <div className='d-flex flex-row align-items-center'>
            <label className='h2' htmlFor='email'>Email: </label>
            <h2 className='' id='email'>{user.email}</h2>
          </div>
          <h3 className=''>Meus pets para adoção</h3>
          <h3>Meus Interesses</h3>

        </div>

        <div className="modal fade" id="photoModal" tabIndex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title fs-4" id="photoModalLabel">Foto de Perfil</h5>
            </div>
            <div className="modal-body">
              <div className='d-flex flex-column justify-content-center align-items-center'>
                {(user.photo && !photo) ?
                  <img src={user.photo} className='border mb-2'  width={"300px"} alt="photo" /> : `${user.photo}`
                }
                {(photo) ? <img src={URL.createObjectURL(photo)} className='border mb-2'  width={"300px"} alt="photo" /> 
                  : `${user.photo}`
                }
                {(!photo && !user.photo) ? <img src="/assets/images/blank_profile.png" className='border mb-2' height={"300px"} alt="profile" />: "3"}
                <label htmlFor='photo' className='btn btn-warning'>Trocar foto</label>
                <input className='d-none' type="file" id='photo' onChange={handleUploadChange}></input>
              </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={uploadPhoto} data-bs-dismiss="modal">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        
    </div>
  )
}
