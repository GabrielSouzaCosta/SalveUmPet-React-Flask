import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CatsPage() {
  const [cats, setCats] = useState([])
  
  
  useEffect(() => {
    fetch('/api/animals/cats', {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => setCats(res))
    .catch(error => console.log(error))
    
  }, [])
  

  return (
    <>
    <Navbar />
    <div className="h-100">
      
    <div className="container-fluid">
        <h1 className='display-4 text-center mb-5 pt-2 fw-bolder'>Gatinhos para salvar próximo de você: Pouso Alegre</h1>
          <div className='row'>
                {cats.map(cat => {  
                  var date = ""
                  if (cat.published_date) {
                    var date = cat.published_date.substring(0, 10).split('-').reverse().join("/")
                  }

                  
                  return (
                    <div key={cat.id} className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <div className="card mb-2">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{cat.name}</div>
                          <div className="card-body text-center fs-5 p-0">
                          <Link to={`/gatos/${cat.id}`} id={cat.id}><img style={{height: "220px"}} className="card-img-top" src={cat.image} alt=""/></Link>
                            <p className="card-text m-0">Distância: 0,1km</p>
                            <p className="card-text m-0">Idade: {(cat.years === 1) ? `${cat.years} ano`:""} {(cat.years > 1) ? `${cat.years} anos`: ""} {(cat.years && cat.months) ? " e ": ""} {(cat.months === 1) ? `${cat.months} mês` : ""}  {(cat.months > 1) ? `${cat.months} meses` : ""}</p>
                            <p className="card-text fs-5">{cat.details}</p>
                          </div>
                          <div className="card-footer text-muted">
                            Publicado em {date}
                          </div>
                        </div>
                    </div>
                  )
                })}


                
          </div>
    </div>


    </div>
    <Footer />
    </>
  )
}