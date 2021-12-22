import React,{useState} from 'react'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import {useHistory} from 'react-router-dom';

import "./SignUp_user.css"

function SignUp_user() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    let history= useHistory();


    async function google_submit(response){
        var email= response.profileObj.email;
        var username=response.profileObj.name;
        var password=response.profileObj.googleId;
        
        await axios.post('/Osignup_user', {username,email,password});
    }
    async function submit(){
        console.log("trying to submit");

        try{
            var token = await axios.post('/signup_user',{username,password,email});
           
           history.push('/login_user')
        }catch(err){
            alert(err.response.data)
        }
    }
    return (

      <div className="signupu">
      <span className='signupuTitle'>Register For User</span>
      <div className='signupuForm'>
          <label>User Name</label>
          <input className="signupuInput" type="text" placeholder="Username" value={username} onChange={({target})=>{ setUsername(target.value)}} required />
          <label>Password</label>
          <input className="signupuInput" type="password" placeholder="Enter your password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
          <label>Email</label>
          <input className="signupuInput" type="email" placeholder="Enter your email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
          <button className="signupuButton" type="submit" onClick={submit}>Sign Up</button>
      </div>
      <br/>
      <p>--------------OR--------------</p>
      <GoogleLogin
                clientId="1095483584862-to18ei3hbu77vf6tpd558crcnsjdper7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => {
                   google_submit(response)
                }}
                onFailure={(err)=>{console.log(err)}}
            />
      {/* <button className="signinutButton">Sign In</button> */}
      </div>
  
    );
}

export default SignUp_user
