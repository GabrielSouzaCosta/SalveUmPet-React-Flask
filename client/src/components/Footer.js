import React from "react"

function Footer () {

    return (
        <nav className="navbar pb-0">
            <div className="container-fluid bg-secondary py-2">
                <p className="m-0">Contate-me: <a className="text-decoration-none text-black" href="mailto:gabriSco72@gmail.com" target="_blank">gabriSco72@gmail.com</a></p>
                <a className="text-decoration-none text-black fs-5" href="https://github.com/GabrielSouzaCosta" target="_blank"><img className="img-fluid pe-2" style={{maxWidth: "80px"}} src="assets/images/github.png" alt="" />Meu Github</a>
            </div>

        </nav>
    )
}

export default Footer