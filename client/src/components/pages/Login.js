import React from 'react'

export default function Login() {
  return (
        <div className="container">
              <div className="login-card">
                  <div className="login-form">
                      <h1>Entrar</h1>
                      <p>E-mail</p>
                      <input id="username" type="text" required placeholder="brucewayne@batmail.com..." />
                          <p>Senha</p>
                          <input type="password" required />
                              <p><a href="">Esqueceu a senha?</a></p>
                              <button type="submit">Entrar</button>
                          </div>
                        </div>
              </div>
              )
              }
