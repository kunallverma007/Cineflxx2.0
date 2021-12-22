import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import './SignUp_user.css'
function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    let history= useHistory();
    async function submit(){
        console.log("trying to submit");

        try{
            var token = await axios.post('/signup_user',{username,password,email});
           
           history.push('/login_user')
        }catch(err){
            alert(err.response.data)
        }
    }
    async function google_submit(response){
      var email= response.profileObj.email;
      var username=response.profileObj.name;
      var googleId=response.profileObj.googleId;
      console.log(email,username,googleId)
      await axios.post('/Osignup_user', {email,username,googleId});
  }
    return (

        <div>
        <div className="signup">
      <span className='signupTitle'>Register</span>
      <div className='signupForm'>
          <label>User Name</label>
          <input className="signupInput" type="text" placeholder="Username" value={username} onChange={({target})=>{ setUsername(target.value)}} required />
          <label>Email</label>
          <input className="signupInput" type="email" placeholder="Enter your email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
          <label>Password</label>
          <input className="signupInput" type="password" placeholder="Enter your password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
          <button className="signupButton" type="submit" onClick={submit}>Sign Up</button>
      </div>
      {/* <button className="signinButton" >Sign Up</button> */}
      
      <br/>
      <GoogleLogin
                clientId="1095483584862-to18ei3hbu77vf6tpd558crcnsjdper7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => {
                   google_submit(response)
                }}
                onFailure={(err)=>{console.log(err)}}
            />      
      </div>
        
        
      </div>
  
    )
}

export default SignUp_theater
