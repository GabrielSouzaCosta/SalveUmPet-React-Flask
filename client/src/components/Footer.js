import React from "react"

function Footer () {

    return (
        <nav className="navbar">
            <div className="container-fluid">
                <h3>Contate-me: <a className="text-decoration-none text-black" href="mailto:gabriSco72@gmail.com" target="_blank">gabriSco72@gmail.com</a></h3>
                <a className="text-decoration-none text-black" href="" ><h3>Sobre</h3></a>
                <a className="text-decoration-none text-black" href="https://github.com/GabrielSouzaCosta" target="_blank"><img className="img-fluid pe-2" src="assets/images/github.png" alt="" />Meu Github</a>
            </div>

        </nav>
    )
}

export default Footer