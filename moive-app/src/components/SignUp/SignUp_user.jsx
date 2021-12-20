import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom';

function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    let history= useHistory();
    async function submit(){
        console.log("trying to submit");

        try{
            var token = await axios.post('/signup_user',{username,password,email});
           
            localStorage.setItem("token",token.data);
            localStorage.setItem("type","user")

           history.push('/conc?movie_id=550')
        }catch(err){
            console.log(err)
        }
    }
    return (

        <div>
        <div>
          <label>User Name</label>
          <input type="text" name="Username" value={username} onChange={({target})=>{ setUsername(target.value)}}required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="Email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
        </div>
        
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
        </div>
        
        <button onClick={submit}>Sign Up</button>
      </div>
  
    )
}

export default SignUp_theater
