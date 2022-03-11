import React from "react"

function Navbar () {
    return (<>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img height={"45px"} src="assets/images/logo.png"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-sm-auto">
                            <li className="nav-item"><a className="nav-link fs-5" href="http://localhost:3000/cats"><img height={"50px"} src="assets/images/cat.png" alt="" /> Salve Um Gato </a></li>
                            <li className="nav-item"><a className="nav-link fs-5" href="http://localhost:3000/dogs">Salve um Dog <img height={"50px"} src="assets/images/dog.png" alt="" /></a></li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav" >
                                <li className="nav-item"><a className="nav-link fs-5" href="http://localhost:3000/login">Login</a></li>
                                <li className="nav-item"><a className="nav-link fs-5" href="">Registrar-se</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
    </>

    )
}


// <nav className="navbar navbar-expand-md bg-light sticky-top">
// <div className="container-fluid">
//     <a className="navbar-brand" href="/"><img height={"45px"} src="assets/images/logo.png"/></a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav">
//             <li className="nav-item"><a className="nav-link d-inline-block text-black fs-5" href="http://localhost:3000/cats"><img className=".d-sm-none .d-md-block" height={"50px"} src="assets/images/cat.png" alt="" /> Salve Um Gato </a></li>
//             <li className="nav-item"><a className="nav-link d-inline-block text-black fs-5" href="http://localhost:3000/dogs">Salve um Dog <img className=".d-sm-none .d-md-block"  height={"50px"} src="assets/images/dog.png" alt="" /></a></li>
//         </ul>
//         <div className="justify-content-end">
//             
//         </div>
//     </div>
// </div>
// </nav>

export default Navbar;