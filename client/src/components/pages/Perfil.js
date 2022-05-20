import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

export default function Perfil() {
    const [user, setUser] = useState({});
    const [photo, setPhoto] = useState("");
    const [interests, setInterests] = useState([])

    useEffect(() => {
        axios.get('/api/profile', {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} }).then(res => {setUser(res.data); setInterests(res.data.interests)} );
    }, [])

    async function handleDeleteInterest(e, id) {
      e.preventDefault();
      await axios.delete(`/api/delete/${id}/`, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")} } )
      .then(res => setInterests(interests.filter((interest) => {
        if (interest.id !== res.data.id) {
          console.log(interest);
          return interest;
        }
        return null;
      }
      ))
      )
    }

    function handleUploadChange(e) {
      setPhoto(e.target.files[0]);
    }

    async function uploadPhoto(e) {
        var formData = new FormData();
        formData.append("profile_photo", photo);
        await axios.post(`/api/upload_image/${user.id}`, formData, {headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token") }} )
    }    
    
  return (
    <div className='vh-100'>
        <Navbar />

        <div className='d-flex flex-column align-items-center pt-4'>
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
        </div>
          
          <div className='d-flex justify-content-around'>
              <div className='w-50 h-100'>
                <span className='card btn bg-warning h-100 mb-2 fs-5 fw-bold text-center text-uppercase py-1 mx-2'>Meus pets para adoção</span>

                <div className='row w-100 ps-3'>
                {(user.animals) ? user.animals.map((animal) => {
                  return (
                      <div key={animal.id} className='col-md-8 col-lg-6 m-auto'>
                        <div className="card mb-2 d-flex justify-content-center">
                          <div style={{backgroundColor: "rgb(252, 222, 102)"}} className='card-header text-center fs-4 fw-bold p-1'>
                            {animal.name}
                            <Link to={`/atualizar_post/${animal.id}`} style={{color: "rgb(252, 222, 102)"}} className={"btn btn-dark float-end"}>Editar</Link>
                          </div>
                          <div className="card-body text-center fs-5 p-0">
                            <Link to={`/${animal.category}s/${animal.id}`} key={`link-${animal.id}`}>
                              {(animal.image)? 
                              <div style={{height: "400px"}} className='d-flex align-items-center'>
                                <img className="card-img-top h-100" src={animal.image} alt=""/>
                              </div> 
                              :
                              <div style={{height: "400px"}} className='d-flex align-items-center'>
                                <img key={`image-${animal.id}`}  className="card-img-top h-100" src={`assets/images/nophoto${animal.category}.png`} alt="animal"/>
                              </div>
                              }
                            </Link>
                            <div style={{backgroundColor: "rgb(252, 222, 102)"}} className='card-footer' key={`description-${animal.id}`} >
                              <p className="card-text m-0">Idade: {(animal.years === 1) ? `${animal.years} ano`:""} {(animal.years > 1) ? `${animal.years} anos`: ""} {(animal.years && animal.months) ? " e ": ""} {(animal.months === 1) ? `${animal.months} mês` : ""}  {(animal.months > 1) ? `${animal.months} meses` : ""}</p>
                              <p className="card-text fs-5">{animal.details}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                  )
                }) : ""}
                </div>
              
              </div>
              
              <div className='w-50 h-100'>
                <span className='card btn bg-success h-100 mb-2 fs-5 fw-bold text-uppercase py-1 mx-2'>Pets que quero adotar</span>

                <div className='row w-100 ps-3'>
                  {(interests) ? interests.map((animal) => {
                    return (
                      <div key={animal.id} className='col-md-8 col-lg-6 mb-2 m-auto'>
                          <div className="card mb-2 ms-2">
                            <div style={{backgroundColor: "rgb(252, 222, 102)"}} className='card-header text-center fs-4 fw-bold p-1'>
                              {animal.name}
                              <button style={{color: "rgb(252, 222, 102)"}} onClick={(e) => handleDeleteInterest(e, animal.id)} className='btn btn-dark float-end'>Remover interesse</button>
                            </div>
                            <div className="card-body text-center fs-5 p-0">
                              <Link to={`/${animal.category}s/${animal.id}`} key={`link-${animal.id}`}>
                                {(animal.image)? 
                                  <div style={{height: "400px"}} className='d-flex align-items-center'>
                                    <img key={`image-${animal.id}`} className="card-img-top h-100" src={animal.image} alt="animal"/> 
                                  </div>
                                  :
                                  <div style={{height: "400px"}} className='d-flex align-items-center'>
                                    <img key={`image-${animal.id}`}  className="card-img-top h-100" src={`assets/images/nophoto${animal.category}.png`} alt="animal"/>
                                  </div>
                                }
                              </Link>
                              <div style={{backgroundColor: "rgb(252, 222, 102)"}} className='card-footer' key={`description-${animal.id}`} >
                                <p className="card-text m-0">Idade: {(animal.years === 1) ? `${animal.years} ano`:""} {(animal.years > 1) ? `${animal.years} anos`: ""} {(animal.years && animal.months) ? " e ": ""} {(animal.months === 1) ? `${animal.months} mês` : ""}  {(animal.months > 1) ? `${animal.months} meses` : ""}</p>
                                <p className="card-text fs-5">{animal.details}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    )
                  }) : ""}
                </div>
              </div>

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
