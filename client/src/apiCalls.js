import axios from "axios";
import { LoginSuccess } from "./context/AuthActions";

export const loginCall= async(userCredentials,dispatch)=>{
    dispatch({type:"LOGIN_START"});
    try{
        const res=await axios.post("auth/login",userCredentials);
        dispatch(LoginSuccess(res.data))
    }  catch(err){
        dispatch({type:"LOGIN_SUCCESS",payload:err});
    } 
};