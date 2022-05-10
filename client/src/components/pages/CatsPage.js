import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function CatsPage(props) {

  return (
    <>
    <div style={{backgroundColor: "#904e55"}} className="h-100">
      
    <Navbar />
    <div className="container-fluid vh-100">
        <h1 className='display-4 text-center mb-5 mt-3 fw-bolder'>Gatinhos para salvar próximo de você: Pouso Alegre</h1>
          <div className='row'>
                {props.cats.map(cat => {
                  return (
                    <div key={cat.id} className='col-sm-2'>
                        <div className="card mb-2">
                          <div className='card-header text-center fs-4 fw-bold p-0'>{cat.name}</div>
                          <a href=""><img className="card-img-top" src="assets/images/juquinha.jpeg" alt=""/></a>
                          <div className="card-body text-center fs-5 p-0">
                            <p className="card-text m-0">Distância: 0,1km</p>
                            <p className="card-text m-0">Idade: {cat.age}</p>
                            <p className="card-text fs-5">{cat.animalDetails}</p>
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