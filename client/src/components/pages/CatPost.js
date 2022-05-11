import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function CatPost() {
  const [cat, setCat] = useState({})

  const params = useParams();

  useEffect(() => {
    async function getCat() {
      await axios.get(`/api/animals/cats/${params.id}`)
      .then(res => setCat(res.data))
    }
    getCat();
  }, [])

  return (
    <div style={{backgroundColor: "#eefff0"}}  className='vh-100'>
      <Navbar />
      <div className='container-fluid'>
        <div className='d-flex justify-content-center h-100 w-50'>

          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/assets/images/gaia.jpeg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/images/cats/filhote1.jpeg" className="d-block w-100" alt="..."/>
              </div>
              <div className="carousel-item">
                <img src="/assets/images/cats/filhote2.jpeg" className="d-block w-100" alt="..."/>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        <p>{cat.name}</p>
        <p>{cat.animalDetails}</p>
        <p>{cat.age}</p>
        <p>{cat.publishedDate}</p>
      </div>
    </div>
  )
}