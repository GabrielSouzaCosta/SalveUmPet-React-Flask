import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import AutoComplete from 'react-google-autocomplete';

function Posts(props) {

  return (
    <>
    <div className="h-100">
    <Navbar />
    <div className="container-fluid h-100 ">
        <div className='d-flex h-50 flex-column justify-content-start align-items-center'>
            <h1 className='display-4 text-center pt-1'>Pets próximo de você</h1>
            <div className='col mx-auto mb-3'>
              <AutoComplete
                  apiKey={"AIzaSyAU52-udU-FSRLGH3Y0HQoUXzd9QH369co"}
                  onPlaceSelected={(place) => console.log(place)}
              />   
            </div>
        </div>
        {(props.animals) ? 
          <div className='row'>
                {props.animals.map(animal => {                    
                  return (
                    <div key={animal.id} className='col-md-6 col-lg-3 mb-4 mb-lg-0'>
                        <div className="card mb-2 ">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{animal.name}</div>
                          <div className="card-body text-center fs-5 p-0 mb-3">
                          <Link to={`/gatos/${animal.id}`} id={animal.id}>
                            <div style={{height: "400px"}} className='d-flex align-items-center'>
                              <img className="card-img-top h-100" src={animal.image} alt=""/>
                             </div> 
                          </Link>
                            <p className="card-text m-0 bt-2 mt-2">Distância: 0km</p>
                            <p className="card-text m-0">Idade: {(animal.years === 1) ? `${animal.years} ano`:""} {(animal.years > 1) ? `${animal.years} anos`: ""} {(animal.years && animal.months) ? " e ": ""} {(animal.months === 1) ? `${animal.months} mês` : ""}  {(animal.months > 1) ? `${animal.months} meses` : ""}</p>
                            <p className="card-text fs-5">{animal.details}</p>
                          </div>
                          {(animal.published_date) ? 
                          <div className="card-footer text-muted">
                            <span className='fs-6'>Publicado em: {animal.published_date.substring(0, 10).split('-').reverse().join("/")}</span>
                          </div> : "" }
                        </div>
                    </div>
                  )
                })} 
              </div> : <div className='vh-100'>
                          <h1 className='text-center mt-2'>Sem gatos para doação no momento!</h1>
                      </div>   
        }

                
        
    </div>


    </div>
    </>
  )
}

export default Posts