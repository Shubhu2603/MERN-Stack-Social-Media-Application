import React, { useContext, useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@mui/material"

export default function Login() {
const email= useRef();
const password=useRef();
const {user,isFetching,error,dispatch}=useContext(AuthContext);
  const handleClick=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch);
  };
  console.log(user);
  return (
    <div className='login'>
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Lamasocial</h3>
            <span className="loginDescription">Connect with friends all around the world on Lamasocial</span>
        </div>
 
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                <input placeholder="Password" type="password" minLength="6" required className="loginInput" ref={password}/>
                <button className="loginButton" type='submit' disabed={isFetching}>{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Log In"}</button>
                <span className="loginForgot">Forgot Password?</span>
                <button className="loginRegisterButton">{isFetching ? <CircularProgress color="inherit" size="20px"/> : "Create a new account"}</button>
            </form>
            </div>
      </div>
    </div>
  )
}
