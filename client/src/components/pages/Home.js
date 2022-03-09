import React from 'react'

export default function Home() {
  return (
      <body style={{backgroundColor: "black"}}>
        <div className="container-fluid">
                
                    <div class="bg-image vh-100" style={{backgroundImage: "url('assets/images/landingCat.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center top", backgroundSize: "50vh"}}>
                        <div className='container-sm d-flex flex-column text-center justify-content-center h-100 w-50'>
                            <h1 className='display-3 text-white'>Adote um pet facilmente e torne sua vida mais feliz</h1>
                            <p className='muted p-1'>Encontre ou doe gatos e cachorros para pessoas na sua cidade ou próximas de você</p>
                            <p><button className='btn btn-danger m-2'>Adotar um pet ou doar um pet</button> <button className='btn btn-success'>ONG's de Doação</button></p>
                        </div>
                    </div>

            <div className="information">
                <h2>Encontre gatos e cachorros em sua cidade para adotar</h2>
                <div className="cards">
                    <img className="img-fluid" width={"400px"} src="assets/images/ramenCat.png" alt="" />
                    <img className="img-fluid" width={"400px"} src="assets/images/juquinha.jpeg" alt="" />
                    <img className="img-fluid" width={"400px"} src="assets/images/dogWait.jpg" alt="" />
                    <h3>Traga um animalzinho para sua casa e alimente suas barrigas para deixá-los felizes</h3>
                </div>
            </div>
        </div>
      </body>
  )
}
