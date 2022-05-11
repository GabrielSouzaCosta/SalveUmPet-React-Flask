import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Navbar () {
    const [SessionToken, setSessionToken] = useState(sessionStorage.getItem("token"));

    useEffect(()=>{
        setSessionToken(sessionStorage.getItem("token"))
    }, [SessionToken])

    function logout(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        setSessionToken("");
    }


    return (<>
            <nav  className="navbar navbar-expand-lg sticky-top p-0">
                <div style={{backgroundColor: "#e98a15ff"}} className="container-fluid w-100 h-100">
                    <NavLink to="/" className={"navbar-brand"}><img height={"30px"} alt="logo" className="pb-1" src="/assets/images/logo.png"/></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-sm-auto">
                            <li className="nav-item">
                                <NavLink to="/cats" className={"nav-link link-danger fw-bold fs-5"}><img height={"30px"} src="/assets/images/cat.png" alt="" />Salve um Gato</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/dogs" className={"nav-link link-danger fw-bold fs-5"} >Salve um Dog <img height={"30px"} src="/assets/images/dog.png" alt="" /></NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav">
                                { (SessionToken) ? <> 
                                <NavLink to="/new_post" className={"nav-link link-dark fs-5"} >Doar um pet</NavLink>
                                <li className="nav-item"><a className="nav-link link-dark fs-5" href="/" onClick={(e) => logout(e)}>Logout</a></li> 
                                </>
                                : <>
                                <NavLink to="/login" className={"nav-link link-dark fs-5"}>Login</NavLink>
                                <NavLink to="/register" className={"nav-link link-dark fs-5"}>Registrar-se</NavLink>
                                </>}
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