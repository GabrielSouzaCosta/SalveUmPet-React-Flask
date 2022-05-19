import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function CatPost() {
  const [cat, setCat] = useState({})
  const [images, setImages] = useState([])

  const params = useParams();

  useEffect(() => {
    async function getCat() {
      await axios.get(`/api/animals/cats/${params.id}`)
      .then(res => setImages(res.data.images));
    }
    getCat();
  }, []);

  return (
    <div style={{backgroundColor: "#000000ee"}}  className='vh-100'>
      <Navbar />
      
      <div className='d-flex justify-content-center align-items-center'>
        <div id="carouselExampleIndicators" className="carousel slide w-50" data-bs-ride="carousel">
              <div className="carousel-indicators">
                  {images.map((img, i) => {
                    console.log(i)
                    return (
                        <button key={`indicator-${i}`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className="active"
                        aria-current="true" aria-label={`Slide ${i+1}`}></button>
                        
                      )
                  })
                  }
              </div>
              <div className="carousel-inner">
                  {(images) ? images.map((img, index) => {
                      if (index === 0) {
                        return (
                          <div className="carousel-item active">
                            <img style={{height: "800px"}} className="d-block w-100" src={img.url} key={`image-${index}`} alt="image"/>
                          </div> 
                        )
                      } else {
                        return(
                          <div className="carousel-item" >
                          <img style={{height: "800px"}} key={`image-${index}`} className="d-block w-100" src={img.url} alt="image"/>
                        </div>
                        )
                      }
                  }) : ""}
                  
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next">
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
  )
}