import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Navbar'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

  return (
        <>
            <Navbar/>
     
            <div style={{backgroundColor: "#ff4422aa"}} className="container-fluid vh-100 justify-content-center position-absolute top-0">
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
                                        {msg}
                                    </div>


                                    <p><a className="py-3 link-danger" href="">Esqueceu a senha?</a></p>
                                    <p><button className='btn btn-primary' type="submit">Entrar</button></p>
                                    <p><NavLink className={"pt-3 link-primary mb-5"} to="/register">Ainda não possui uma conta?</NavLink></p>
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