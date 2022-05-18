import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

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
      <div className="container-fluid vh-100">
          <h1 className='display-4 text-center mb-5 mt-3'>Cãezinhos para salvar próximo de você: Pouso Alegre</h1>
            <div className='row mx-2'>
              {dogs.map(dog => {
                    return (
                        <div key={dog.id} className='col-sm-3'>
                          <div className="card mb-2">
                            <div className='card-header text-center display-6'>{dog.name}</div>
                            <a href=""><img className="card-img-top" src="assets/images/juquinha.jpeg" alt="dog"/></a>
                            <div className="card-body text-center fs-4">
                              <p className="card-text">Distância: 0,1km</p>
                              <p className="card-text">Idade: {dog.age}</p>
                              <p className="card-text fs-5">{dog.animalDetails}</p>
                            </div>
                            <div className="card-footer text-muted">
                              {dog.publishedDate}
                            </div>
                          </div>
                      </div>
                    )
                  })}

            </div>
      </div>

      <Footer />

    </>
  )
}
