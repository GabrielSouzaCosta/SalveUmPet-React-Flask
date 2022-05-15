import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link } from 'react-router-dom'

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
    <div style={{backgroundColor: "#904e55"}} className="h-100">
      
    <div className="container-fluid h-100">
        <h1 className='display-4 text-center mb-5 pt-2 fw-bolder'>Gatinhos para salvar próximo de você: Pouso Alegre</h1>
          <div className='row'>
                {cats.map(cat => {
                  return (
                    <div key={cat.id} className='col-sm-2'>
                        <div className="card mb-2">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{cat.name}</div>
                          <Link to={`/gatos/${cat.id}`} id={cat.id}><img style={{maxHeight: "300px"}} className="card-img-top" src="assets/images/juquinha.jpeg" alt=""/></Link>
                          <div className="card-body text-center fs-5 p-0">
                            <p className="card-text m-0">Distância: 0,1km</p>
                            <p className="card-text m-0">Idade: {(cat.years === 1) ? `${cat.years} ano`:""} {(cat.years > 1) ? `${cat.years} anos`: ""} {(cat.years && cat.months) ? " e ": ""} {(cat.months === 1) ? `${cat.months} mês` : ""}  {(cat.months > 1) ? `${cat.months} meses` : ""}</p>
                            <p className="card-text fs-5">{cat.details}</p>
                          </div>
                          <div className="card-footer text-muted">
                            {cat.publishedDate}
                          </div>
                        </div>
                    </div>
                  )
                })}


                
          </div>
    </div>
    <Footer />


    </div>
    </>
  )
}

                // <div className='col-sm-3'>
                //   <div className="card mb-2">
                //     <div className='card-header text-center display-6'>Goiabinha</div>
                //     <a href=""><img className="card-img-top" src="assets/images/goiabinha.jpeg" alt=""/></a>
                //     <div className="card-body text-center fs-4">
                //       <p className="card-text">Distância: 0,4km</p>
                //       <p className="card-text">Idade: 6 meses</p>
                //       <p className="card-text fs-5">Um gatinho muito brincalhão e carinhoso</p>
                //     </div>
                //     <div className="card-footer text-muted">
                //       2 dias atrás
                //     </div>
                //   </div>
                // </div>