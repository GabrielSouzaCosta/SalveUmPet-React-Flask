import React, {useState, useEffect} from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

export default function DogsPage() {
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    fetch('/api/animals/dogs', {
      'method': 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json())
    .then(res => setDogs(res))
    .catch(error => console.log(error))
    }, [])


  return (
    <>
    <Navbar />
    <div className="vh-100">
      
    <div className="container-fluid h-100">
        <h1 className='display-4 text-center mb-5 pt-2 fw-bolder'>Doguinhos para salvar próximo de você: Pouso Alegre</h1>
        {(dogs) ? 
          <div className='row'>
                {dogs.map(dog => {                    
                  return (
                    <div key={dog.id} className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <div className="card mb-2 ">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{dog.name}</div>
                          <div className="card-body text-center fs-5 p-0">
                          <Link to={`/dogs/${dog.id}`} id={dog.id}>
                            <div style={{height: "400px"}} className='d-flex align-items-center'>
                              <img className="card-img-top h-100" src={dog.image} alt=""/>
                             </div> 
                          </Link>
                            <p className="card-text m-0">Distância: 0km</p>
                            <p className="card-text m-0">Idade: {(dog.years === 1) ? `${dog.years} ano`:""} {(dog.years > 1) ? `${dog.years} anos`: ""} {(dog.years && dog.months) ? " e ": ""} {(dog.months === 1) ? `${dog.months} mês` : ""}  {(dog.months > 1) ? `${dog.months} meses` : ""}</p>
                            <p className="card-text fs-5">{dog.details}</p>
                          </div>
                          {(dog.published_date) ? 
                          <div className="card-footer text-muted">
                            <span className='fs-6'>Publicado em: {dog.published_date.substring(0, 10).split('-').reverse().join("/")}</span>
                          </div> : "" }
                        </div>
                    </div>
                  )
                })} 
              </div> : <div className='vh-100'>
                          <h1 className='text-center mt-2'>Sem dogs para doação no momento!</h1>
                      </div>   
        }
                

                
    </div>


    </div>
    <Footer />
    </>
  )
}
