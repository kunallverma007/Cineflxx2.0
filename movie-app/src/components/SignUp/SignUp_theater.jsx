import React,{useState} from 'react'
import axios from 'axios'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import './SignUp_theater.css'

function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    const [city, setCity] =useState("");
    let history = useHistory();
    async function google_submit(response){
        var email= response.profileObj.email;
        var username=response.profileObj.name;
        var password=response.profileObj.googleId;
        var city=""
        // try{
        //     city=response.profileObj.city
        // }
        // catch(err){
        //     console.log(err)
        // }
        console.log(city)
        await axios.post('/Osignup_theater', {username,email,password,city});
    }
    async function submit(){
        try{
            var token=await axios.post('/signup_theater',{username,password,email,city});
            
            history.push('/login_theater')

          }catch(err){
            alert(err.response.data)
        }
    }

    return (
      <div className="signupt">
      <span className='signuptTitle'>Register For Theater</span>
      <div className='signuptForm'>
          <label>User Name</label>
          <input className="signuptInput" type="text" placeholder="Username" value={username} onChange={({target})=>{ setUsername(target.value)}} required />
          <label>Password</label>
          <input className="signuptInput" type="password" placeholder="Enter your password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
         <label>Email</label>
          <input className="signuptInput" type="email" placeholder="Enter your email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
           <label>City</label>
          <input className="signuptInput" type="text" placeholder="Enter your city" value={city} onChange={({target})=>{ setCity(target.value)}} required />
          <button className="signuptButton" type="submit" onClick={submit}>Sign Up</button>
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
      
      
      {/* <button className="signinuttButton">Sign In</button> */}
      </div>
    )
}

export default SignUp_theater
