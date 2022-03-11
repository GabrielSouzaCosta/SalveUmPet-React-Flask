import React from 'react'
import Navbar from '../Navbar'

export default function DogsPage() {
  return (
    <>
    
      <Navbar />
      <div className="container-fluid">
          <h1 className='display-4 text-center mb-5 mt-3'>Cãezinhos para salvar próximo de você: Pouso Alegre</h1>
            <div className='row mx-2'>
                  <div className='col-sm-3'>
                    <div className="card">
                      <div className='card-header text-center display-6'>Francisquinho</div>
                      <a href=""><img className="card-img-top" src="assets/images/dogs/dog6.jpg" alt=""/></a>
                      <div className="card-body text-center fs-4">
                        <p className="card-text">Distância: 0,4km</p>
                        <p className="card-text">Idade: 6 meses</p>
                        <p className="card-text fs-5">Um cachorrinho muito bonitinho</p>
                      </div>
                      <div class="card-footer text-muted">
                        2 dias atrás
                      </div>
                    </div>
                  </div>

                  <div className='col-sm-3'>
                    <div className="card">
                      <div className='card-header text-center display-6'>Rodolfinho</div>
                      <a href=""><img className="card-img-top" src="assets/images/dogs/dog2.jpg" alt=""/></a>
                      <div className="card-body text-center fs-4">
                        <p className="card-text">Distância: 0,4km</p>
                        <p className="card-text">Idade: 6 meses</p>
                        <p className="card-text fs-5">Um cachorrinho muito bonitinho</p>
                      </div>
                      <div class="card-footer text-muted">
                        2 dias atrás
                      </div>
                    </div>
                  </div>
            </div>
      </div>

    </>
  )
}
