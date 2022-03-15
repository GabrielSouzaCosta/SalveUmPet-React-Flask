import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function CatsPage() {
  return (
    <>
    
    <Navbar />
    <div className="container-fluid">
        <h1 className='display-4 text-center mb-5 mt-3'>Gatinhos para salvar próximo de você: Pouso Alegre</h1>
          <div className='row'>
                <div className='col-sm-3'>
                  <div className="card mb-2">
                    <div className='card-header text-center display-6'>Goiabinha</div>
                    <a href=""><img className="card-img-top" src="assets/images/goiabinha.jpeg" alt=""/></a>
                    <div className="card-body text-center fs-4">
                      <p className="card-text">Distância: 0,4km</p>
                      <p className="card-text">Idade: 6 meses</p>
                      <p className="card-text fs-5">Um gatinho muito brincalhão e carinhoso</p>
                    </div>
                    <div class="card-footer text-muted">
                      2 dias atrás
                    </div>
                  </div>
                </div>

                <div className='col-sm-3'>
                  <div className="card mb-2">
                    <div className='card-header text-center display-6'>Juquinha</div>
                    <a href=""><img className="card-img-top" src="assets/images/juquinha.jpeg" alt=""/></a>
                    <div className="card-body text-center fs-4">
                      <p className="card-text">Distância: 0,1km</p>
                      <p className="card-text">Idade: 6 meses</p>
                      <p className="card-text fs-5">O melhor gato do mundo</p>
                    </div>
                    <div class="card-footer text-muted">
                      2 dias atrás
                    </div>
                  </div>
                </div>
          </div>
    </div>

    <Footer />

    </>
  )
}
