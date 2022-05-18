import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate } from 'react-router-dom';
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
    }})

    async function register() {
      if (emailValidation() === false) {
          console.log(email)
          setMsg("Please, provide a valid email.")
          return
        } else if (password === "") {
          setMsg("Please provide a password.")
          return
        }
      await axios.post('/api/register', {"email":email, "password":password, "name": name})
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
    <div style={{backgroundColor: "#E89291"}} className='d-flex flex-column vh-100'>
    <Navbar/>
      <div className='d-flex mw-100 align-items-center justify-content-center h-100'>
          <div className="card shadow-lg d-flex flex-column mw-100 justify-content-center align-items-center py-5 px-5">
              
              <h1 className="pt-4 pb-4 display-5">REGISTRAR-SE</h1>
              <form className='form' onSubmit={(e) => e.preventDefault()}>
                <div className='d-flex flex-column justify-content-center text-center w-100 px-1'>
                  <label htmlFor="email">Email:</label>
                  <input className="form-control form-control-sm my-2" type="email" id='email' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <label htmlFor="name">Nome Completo:</label>
                  <input className="form-control form-control-sm my-2" type="text" id='name' required value={name} onChange={(e) => setName(e.target.value)}></input>
                  <label htmlFor="pwd" >Senha:</label>
                  <input className="form-control form-control-sm my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                  <div id="passwordHelpBlock" className="form-text mb-3">
                    Sua senha deve conter no mínimo 8 caracteres
                  </div>
                  <button className="my-2 btn btn-danger" type="submit" onClick={register}>Criar Conta</button>
                </div>
              </form>
              
              <Link to="/login">Já possui uma conta?</Link>
              <div id="passwordHelpBlock" className="form-text mb-3 ">
                      {msg}
              </div>

                

        </div>
      </div>
    </div>
</>
  )
}

export default Register