import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [msg, setMsg] = useState("");


    const navigate = useNavigate();

    useEffect(()=>{
        if(sessionStorage.getItem("token")) {
            navigate('/perfil')
    }}, [])

    async function register() {
      if (emailValidation() === false) {
          console.log(email)
          setMsg("Please, provide a valid email.")
          return
        } else if (password === "") {
          setMsg("Please provide a password.")
          return
        }
      await axios.post(process.env.REACT_APP_SERVER_URL+'/api/register', {"email":email, "password":password, "name": name})
      .then(res => {
          if (res.status === 200) {
          setMsg("LOADING...");
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
    <div style={{backgroundColor: "#E89291"}} className='container-fluid vh-100 justify-content-center position-absolute top-0'>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-sm-12 col-md-8 col-lg-3">
          <div className="card">
            <div className="card-body text-center">
                <h1 className='display-3 py-3'>Registrar</h1>
                <div className='row justify-content-center'>
                  <div className="col-8 col-md-8 col-sm-auto col-lg-10">
                    <label className="form-label align-self-start" htmlFor="email">E-mail</label>
                    <input className='form-control mb-2' type="email" id='email' onChange={(e)=>setEmail(e.target.value)} required placeholder="brucewayne@batmail.com..." />
                    <label className="form-label align-self-start" htmlFor="name">Nome</label>
                    <input className='form-control mb-2' type="text" id='name' onChange={(e)=>setName(e.target.value)} required placeholder="Nome Completo..." />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className='col-8 col-md-8 col-sm-auto col-lg-10'>
                      <label className='form-label' htmlFor="password">Senha</label>
                      <input className='form-control' type="password" id='password' onChange={(e)=>setPassword(e.target.value)} required placeholder='**************************' aria-describedby="passwordHelpBlock"></input>
                  </div>
                  <div id="passwordHelpBlock" className="form-text pb-3">
                      {msg}
                  </div>
                </div>
                <p><button className='btn btn-primary' type="submit" onClick={register}>Entrar</button></p>
                <p><NavLink className={"pt-3 link-primary mb-5"} to="/login">Já possui uma conta?</NavLink></p>
                </div>
            </div>
          </div>
        </div>
      </div>
        </>
  )
}

export default Register