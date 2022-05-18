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
          {(user.animals) ? user.animals.map((animal) => {
            return (<>
            <div key={animal.id} className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <div className="card mb-2">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{animal.name}</div>
                          <div className="card-body text-center fs-5 p-0">

                            {(animal.image)? <img style={{height: "220px"}} className="card-img-top" src={animal.image} alt="animal"/> :
                                             <img style={{height: "350px"}} className="card-img-top" src="assets/images/nophoto.png" alt="animal"/>}

                            <div className='card-footer'>
                              <p className="card-text m-0">Idade: {(animal.years === 1) ? `${animal.years} ano`:""} {(animal.years > 1) ? `${animal.years} anos`: ""} {(animal.years && animal.months) ? " e ": ""} {(animal.months === 1) ? `${animal.months} mês` : ""}  {(animal.months > 1) ? `${animal.months} meses` : ""}</p>
                              <p className="card-text fs-5">{animal.details}</p>
                            </div>
                          </div>
                        </div>
                    </div>
            
            </>)
          }) : ""}
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
                  <img src={user.photo} className='border mb-2'  width={"300px"} alt="profile" /> : `${user.photo}`
                }
                {(photo) ? <img src={URL.createObjectURL(photo)} className='border mb-2'  width={"300px"} alt="profile" /> 
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
