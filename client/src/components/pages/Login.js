import React from 'react'
import Navbar from '../Navbar'

export default function Login() {
  return (
        <>
            <nav className="navbar navbar-expand-md bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-brand" href="/"><img height={"50px"} src="assets/images/logo.png"/></a></li>
                    <li className="nav-item"><a className="nav-link d-inline-block text-black fs-5" href="http://localhost:3000/cats"><img height={"50px"} src="assets/images/cat.png" alt="" /> Salve Um Gato </a></li>
                    <li className="nav-item"><a className="nav-link d-inline-block text-black fs-5" href="http://localhost:3000/dogs">Salve um Dog <img height={"50px"} src="assets/images/dog.png" alt="" /></a></li>
                </ul>
                <div className="justify-content-end">
                    <ul className="navbar-nav" >
                        <li className="nav-item"><a className="nav-link text-black fs-5" href="http://localhost:3000/login">Login</a></li>
                        <li className="nav-item"><a className="nav-link text-black fs-5" href="">Registrar-se</a></li>                    
                    </ul>
                </div>
            </div>
            </nav>

                       
            <div className="container-fluid vh-100 justify-content-center">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-sm-12 col-lg-3">
                        <div className="card">
                                <div class="card-body text-center">
                                    <h1 className='display-3 p-5' >Entrar</h1>
                                    <div className='row justify-content-center'>
                                        <div className="col-8 col-md-12 col-sm-auto col-lg-10">
                                            <label className="form-label align-self-start" for="email" >E-mail</label>
                                            <input className='form-control mb-2' type="email" id='email' required placeholder="brucewayne@batmail.com..." />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='col-8 col-md-12 col-sm-auto col-lg-10'>
                                            <label className='form-label' for="password">Senha</label>
                                            <input className='form-control' type="password" id='password' required placeholder='**************************' aria-describedby="passwordHelpBlock"></input>
                                        </div>
                                    </div>
                                    <div id="passwordHelpBlock" class="form-text mb-3">
                                        Sua senha deve conter no mínimo 8 caracteres
                                    </div>


                                    <p><a className="py-3 link-danger" href="">Esqueceu a senha?</a></p>
                                    <p><button className='btn btn-primary' type="submit">Entrar</button></p>
                                    <p><a className="pt-3 link-primary mb-5" href="" >Ainda não possui uma conta?</a></p>
                                </div>
                        </div>
                  </div>
              </div>
          </div>

        


    
        </>
              )
              }



           
           
// <div className="container-fluid vh-100 justify-content-center">
//                 <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col-12 col-md-8 col-lg-3 col-xl-5">
//                         <div className="card">
//                                 <div class="card-body text-center">
//                                     <h1 className='display-3 p-5' >Entrar</h1>
//                                     <div className='row'>
//                                         <label className="form-label align-self-start" for="email" >E-mail</label>
//                                         <input className='form-control mb-2' type="email" id='email' required placeholder="brucewayne@batmail.com..." />
//                                     </div>
//                                     <div className="row col-9">
//                                         <label className='form-label' for="password">Senha</label>
//                                         <input className='form-control' type="password" id='password' required placeholder='**************************' aria-describedby="passwordHelpBlock"></input>
//                                     </div>
//                                     <div id="passwordHelpBlock" class="form-text mb-3">
//                                         Sua senha deve conter no mínimo 8 caracteres
//                                     </div>


//                                     <p><a className="py-3 link-danger" href="">Esqueceu a senha?</a></p>
//                                     <p><button className='btn btn-primary' type="submit">Entrar</button></p>
//                                     <p><a className="pt-3 link-primary mb-5" href="" >Ainda não possui uma conta?</a></p>
//                                 </div>
//                         </div>
//                   </div>
//               </div>
//           </div>