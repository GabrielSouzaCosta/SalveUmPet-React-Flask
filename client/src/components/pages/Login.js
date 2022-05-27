import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem("token")) {
            navigate('/perfil')
    }}, [])

    async function login() {
        if (emailValidation() === false) {
            console.log(email)
            setMsg("Please, provide a valid email.")
            return
          } else if (password === "") {
            setMsg("Please provide a password.")
            return
          }
        await axios.post(process.env.REACT_APP_SERVER_URL+'/api/login', {"email":email, "password":password})
        .then(res => {
            if (res.status === 200) {
            setMsg("Logging in...");
            sessionStorage.setItem("token", res.data.access_token);
            navigate('/perfil')
        }
        })
        .catch(err => {
            if (err.response.status === 401) {
              let msgErr = err.response.data.msg
              setMsg(msgErr)
              throw new Error(msgErr)
          } else {
            console.log(err)
          }   
        })}


    function emailValidation() {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regex)){
            setMsg("Please provide a valid email");
            return false;
        }
        return true;
      }

  return (
        <>
            <Navbar/>
     
            <div style={{backgroundColor: "#ff4422aa"}} className="container-fluid vh-100 justify-content-center position-absolute top-0">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-sm-12 col-lg-3">
                        <div className="card">
                                <div className="card-body text-center">
                                    <h1 className='display-3 p-5' >Entrar</h1>
                                    <div className='row justify-content-center'>
                                        <div className="col-8 col-md-12 col-sm-auto col-lg-10">
                                            <label className="form-label align-self-start" htmlFor="email">E-mail</label>
                                            <input className='form-control mb-2' type="email" id='email' onChange={(e)=>setEmail(e.target.value)} required placeholder="brucewayne@batmail.com..." />
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className='col-8 col-md-12 col-sm-auto col-lg-10'>
                                            <label className='form-label' htmlFor="password">Senha</label>
                                            <input className='form-control' type="password" id='password' onChange={(e)=>setPassword(e.target.value)} required placeholder='**************************' aria-describedby="passwordHelpBlock"></input>
                                        </div>
                                        <div id="passwordHelpBlock" className="form-text pb-3">
                                            {msg}
                                        </div>
                                    </div>


                                    <p><a className="py-3 link-danger" href="">Esqueceu a senha?</a></p>
                                    <p><button className='btn btn-primary' type="submit" onClick={login}>Entrar</button></p>
                                    <p><NavLink className={"pt-3 link-primary mb-5"} to="/register">Ainda não possui uma conta?</NavLink></p>
                                </div>
                        </div>
                  </div>
              </div>
          </div>

        </>
        )
    }