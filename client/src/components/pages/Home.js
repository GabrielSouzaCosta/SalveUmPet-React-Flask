import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function Home() {
    return (
      <>
        <Navbar />
      <body style={{backgroundColor: "black"}}>
        <div className="container-fluid text-white">
                    <div class="bg-image vh-100" style={{backgroundImage: "url('assets/images/landingCat.png')", backgroundRepeat: "no-repeat", backgroundPosition: "left", backgroundSize: "50vh", backgroundBlendMode: "overlay"}}>
                        <div className='container-sm d-flex flex-column text-center justify-content-center h-100 w-50'>
                            <h1 className='display-3 '>Adote um pet facilmente e torne sua vida mais feliz</h1>
                            <p className='display-6 lead p-1'>Encontre ou doe gatos e cachorros para pessoas na sua cidade ou próximas de você</p>
                            <p><button className='btn btn-outline-danger m-2'>Adotar um pet ou doar um pet</button> <button className='btn btn-outline-success'>ONG's de Doação</button></p>
                        </div>
                    </div>

            <div className="container text-center">
                <h2 className="display-5 mb-4" >Encontre gatos e cachorros em sua cidade para adotar</h2>
                <div className="cards">
                    <img className="img-fluid px-2 p-sm-2" width={"400px"} src="assets/images/ramenCat.png" alt="" />
                    <img className="img-fluid px-2 p-sm-2" width={"400px"} src="assets/images/juquinha.jpeg" alt="" />
                    <img className="img-fluid px-2 p-sm-2" width={"400px"} src="assets/images/dogWait.jpg" alt="" />
                    <h3 className='display-6 py-4'>Traga um animalzinho para sua casa e alimente suas barrigas para deixá-los felizes</h3>
                </div>
            </div>
        </div>
      </body>
      <Footer />
      </>
  )
}
