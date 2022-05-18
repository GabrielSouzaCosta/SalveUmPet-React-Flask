import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
      <>

        <Navbar />
        <div style={{backgroundColor: "black"}}>

          <div className="bg-image vh-100" style={{backgroundImage: "url('assets/images/landingCat.png')", backgroundRepeat: "no-repeat", backgroundPosition: "left", backgroundSize: "contain", backgroundBlendMode: "overlay"}}>
              <div className='container-sm d-none d-md-flex flex-column text-center justify-content-center h-100 w-50 text-white'>
                  <h1 className='display-4'>Adote um pet facilmente e torne sua vida mais feliz</h1>
                  <p className='display-6 lead p-1'>Encontre ou doe gatos e cachorros para pessoas na sua cidade ou próximas de você</p>
                  {(!sessionStorage.getItem("token")) ?
                  <p>
                    <NavLink to="/login" className={"btn btn-outline-danger m-2"}>Adotar um pet ou doar um pet</NavLink>
                    <button className='btn btn-outline-success'>ONG's de Doação</button>
                  </p> : ""}
              </div>
              <div className='container-md d-sm-flex d-md-none flex-column pt-3 text-center justify-content-center align-items-center text-warning'>
                  <h1 className='fs-2 fw-bolder'>Adote um pet facilmente e torne sua vida mais feliz</h1>
                  <p className='fs-4'>Encontre ou doe gatos e cachorros para pessoas na sua cidade ou próximas de você</p>
                  
                    <div className='d-flex flex-column align-items-center'>
                      <div className='btn-group w-50 mb-1' role="group" aria-label="Basic example">
                        <button type='button' className='btn btn-warning px-0 text-white'>Adotar um pet</button>
                        <button type='button' className='btn btn-warning me-2 px-0 text-white'>Doar um pet</button>
                      </div>
                      <button className='btn btn-success'>ONG's de Doação</button>
                    </div>
                
              </div>
          </div>
          

        <div className="container-fluid text-white h-100 mt-5 py-1">
          <h2 className="display-5 text-center mb-5" >Encontre gatos e cachorros em sua cidade para adotar</h2>
          <div className='d-flex flex-md-row flex-column justify-content-center align-items-center mb-5'>
            <img className="img-fluid p-2" width={"400px"} src="assets/images/ramenCat.png" alt="" />
            <img className="img-fluid p-2" width={"400px"} src="assets/images/juquinha.jpeg" alt="" />
            <img className="img-fluid p-2" width={"400px"} src="assets/images/dogWait.jpg" alt="" />
          </div>
        </div>
        <Footer />
      </div>
      </>
  )
}
