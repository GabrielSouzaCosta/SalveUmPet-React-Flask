import React from "react"

function Navbar () {
    return (

        <nav className="navbar navbar-expand-md bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-brand" href="/"><img height={"50px"} src="assets/images/logo.png"/></a></li>
                    <li className="nav-item"><a className="nav-link d-inline-block" href="http://localhost:3000/cats"><img height={"50px"} src="assets/images/cat.png" alt="" /> Salve Um Gato </a></li>
                    <li className="nav-item"><a className="nav-link d-inline-block" href="http://localhost:3000/dogs">Salve um Dog <img height={"50px"} src="assets/images/dog.png" alt="" /></a></li>
                </ul>
                <div className="justify-content-end">
                    <ul className="navbar-nav" >
                        <li className="nav-item"><a className="nav-link " href="http://localhost:3000/login">Login</a></li>
                        <li className="nav-item"><a className="nav-link" href="">Registrar-se</a></li>                    
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;