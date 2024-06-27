import React from 'react'
import './register.css'

export default function Register() {
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDescription">Connect with friends all around the world on Lamasocial</span>
        </div>

        <div className="loginRight">
            <div className="loginBox">
                <input placeholder="Username" className="loginInput" />
                <input placeholder="Email" className="loginInput" />
                <input placeholder="Password" className="loginInput" />
                <input placeholder="Confirm Password" className="loginInput" />
                <button className="loginButton">Sign Up</button>

                <button className="loginRegisterButton">Create a new Account</button>
            </div>
            </div>
      </div>
    </div>
  )
}
