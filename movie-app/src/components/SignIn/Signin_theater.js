import React,{useState} from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import "./Signin_theater.css"

import {useHistory} from "react-router-dom"
function Signin_theater() {
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    let history=useHistory();
    async function google_submit(response){
        var email= response.profileObj.email;
        var password=response.profileObj.googleId;
        var token=await axios.post('/Osignup_theater', {email,password});
        localStorage.setItem("token",token.data);
            localStorage.setItem("type","theater")
        history.push("/")
    }

    async function submit(){
        try{
            var token=await axios.post('/signin_theater',{email,password});
            localStorage.setItem("token",token.data);
            localStorage.setItem("type","theater")
            history.push("/")

        }catch(err){
            alert(err.response.data)    
        }
    }
    return (
        <div className="signint">
            <span className='signintTitle'>Login For Theater</span>
            <div className='signintForm'>
                <label>Email</label>
                <input className="signintInput" type="email" placeholder="Enter your email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
                <label>Password</label>
                <input className="signintInput" type="password" placeholder="Enter your password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
                <button className="signintButton" type="submit" onClick={submit}>Sign In</button>
            </div>
            <br/>
      {/* <p>--------------OR--------------</p>
      <GoogleLogin
                clientId="1095483584862-to18ei3hbu77vf6tpd558crcnsjdper7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => {
                   google_submit(response)
                }}
                onFailure={(err)=>{console.log(err)}}
            /> */}
            {/* <button className="signuptButton">Sign Up</button> */}
        </div>
    )
}

export default Signin_theater
