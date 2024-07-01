import React, { useRef } from 'react'
import './register.css'
import axios from 'axios';
import {useNavigate} from "react-router";

export default function Register() {
  const username=useRef();
  const email=useRef();
  const password=useRef();
  const confirmPassword=useRef();
  const navigate=useNavigate();

  const handleClick=async (e)=>{
    e.preventDefault();
    if(confirmPassword.current.value!==password.current.value){
      password.current.setCustomValidity("Passwords don't match");
    }else{
      const user={
        username:username.current.value,
        email:email.current.value,
        password:password.current.value,
      }
      try{
      await axios.post("/auth/register",user);
      navigate("/login");
      }catch(err){
        console.log(err);
      }
    }
  }
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDescription">Connect with friends all around the world on Lamasocial</span>
        </div>

        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Username" required ref={username} className="loginInput" />
                <input placeholder="Email" type='email' required ref={email} className="loginInput" />
                <input placeholder="Password" type='password' minLength="6" required ref={password} className="loginInput" />
                <input placeholder="Confirm Password" type='password' required ref={confirmPassword} className="loginInput" />
                
                <button className="loginButton" type="submit">Sign Up</button>
                <button className="loginRegisterButton">Log into account</button>
            </form>
            </div>
      </div>
    </div>
  )
}
