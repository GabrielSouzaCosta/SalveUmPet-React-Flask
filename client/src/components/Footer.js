import React from "react"

function Footer () {

    return (
        <nav className="navbar py-0">
            <div style={{backgroundColor: "#ffeeff"}} className="container-fluid py-1">
                <p className="m-0 fw-bolder">Contato: <a className="text-black" href="mailto:gabriSco72@gmail.com" rel="noreferrer" target="_blank">gabriSco72@gmail.com</a></p>
                <div className="d-flex align-items-center">
                    <a target="_blank" className="btn" rel="noreferrer" href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/"><img style={{width: "100px"}} className="img-fluid" src="assets/images/LI-Logo.png"></img></a>
                    <a href="https://github.com/GabrielSouzaCosta" rel="noreferrer" target="_blank"><img className="img-fluid pe-2" style={{maxWidth: "70px"}} src="assets/images/github.png" alt="" /></a>
                </div>
            </div>
        </nav>
    )
}

export default Footer