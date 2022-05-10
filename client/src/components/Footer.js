import React from "react"

function Footer () {

    return (
        <nav className="navbar py-0">
            <div className="container-fluid bg-secondary py-1">
                <p className="m-0 fw-bolder">Contato: <a className="text-black" href="mailto:gabriSco72@gmail.com" rel="noreferrer" target="_blank">gabriSco72@gmail.com</a></p>
                <a href="https://github.com/GabrielSouzaCosta" rel="noreferrer" target="_blank"><img className="img-fluid pe-2" style={{maxWidth: "70px"}} src="assets/images/github.png" alt="" /></a>
            </div>

        </nav>
    )
}

export default Footer