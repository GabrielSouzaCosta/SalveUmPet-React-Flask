import React from "react"

function Footer () {

    return (
        <nav className="navbar py-0 d-block mt-3">
            <div style={{backgroundColor: "#ffeeff"}} className="container-fluid py-1">
                <p className="btn btn-dark m-0 fw-bolder">Email<a className="text-white text-decoration-none d-none d-md-flex" href="mailto:gabriSco72@gmail.com" rel="noreferrer" target="_blank">gabriSco72@gmail.com</a></p>
                <div className="d-flex align-items-center">
                    <a target="_blank" className="btn" rel="noreferrer" href="https://www.linkedin.com/in/gabriel-souza-costa-8443481bb/"><img style={{width: "100px"}} className="img-fluid" src={`${process.env.PUBLIC_URL}/assets/images/LI-Logo.png`}></img></a>
                    <a href="https://github.com/GabrielSouzaCosta" rel="noreferrer" target="_blank"><img className="img-fluid pe-3" style={{maxWidth: "70px"}} src={`${process.env.PUBLIC_URL}/assets/images/github.png`} alt="" /></a>
                </div>
            </div>
        </nav>
    )
}

export default Footer