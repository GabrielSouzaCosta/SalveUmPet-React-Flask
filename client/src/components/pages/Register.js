import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link} from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

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
                  <input className="form-control form-control-sm my-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
                  <label htmlFor="pwd" >Password:</label>
                  <input className="form-control form-control-sm my-2" type="password" id="pwd" required value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                  <div id="passwordHelpBlock" class="form-text mb-3">
                    Sua senha deve conter no mínimo 8 caracteres
                  </div>
                  <button className="my-2 btn btn-danger" type="submit">Create account</button>
                </div>
              </form>
              
              <p className="mt-2">Already have an account? <Link to="/login">Login now!</Link></p>
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