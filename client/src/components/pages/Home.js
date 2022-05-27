import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
      <>

        <Navbar />
        <div style={{backgroundColor: "black"}}>

          <div className="bg-image vh-100" style={{backgroundImage: "url("+process.env.PUBLIC_URL+"/assets/images/landingCat.png)", backgroundRepeat: "no-repeat", backgroundPosition: "left", backgroundSize: "contain", backgroundBlendMode: "overlay"}}>
              <div className='container text-center h-100 text-white col col-md-6'>
                <div className='d-flex flex-column align-items-center justify-content-md-center h-100'>
                  <h1 className='display-4 d-none d-md-block'>Adote um pet facilmente e torne sua vida mais feliz</h1>
                  <p className='display-6 lead p-1 d-none d-md-block'>Encontre ou doe gatos e cachorros para pessoas na sua cidade ou próximas de você</p>
                  <div className=''>
                    {(!sessionStorage.getItem("token")) ? <>
                      <NavLink to="/login" className={"btn btn-outline-danger fs-4 me-md-2 mb-2 mb-md-0 mt-4 mt-md-0"}>Adotar um pet ou doar um pet</NavLink>
                      <button className='btn btn-outline-success fs-4'>ONG's de Doação</button>
                    </>
                  : ""}
                  </div>
                </div> 
              </div>
          </div>
          

        <div className="container-fluid text-white h-100 mt-5 py-1">
          <h2 className="display-5 text-center mb-5" >Encontre gatos e cachorros em sua cidade para adotar</h2>
          <div className='d-flex flex-md-row flex-column justify-content-center align-items-center mb-5'>
            <img className="img-fluid p-2" width={"400px"} src={`${process.env.PUBLIC_URL}/assets/images/ramenCat.png`} alt="" />
            <img className="img-fluid p-2" width={"400px"} src={`${process.env.PUBLIC_URL}/assets/images/juquinha.jpeg`} alt="" />
            <img className="img-fluid p-2" width={"400px"} src={`${process.env.PUBLIC_URL}/assets/images/dogWait.jpg`} alt="" />
          </div>
        </div>
        <Footer />
      </div>
      </>
  )
}
