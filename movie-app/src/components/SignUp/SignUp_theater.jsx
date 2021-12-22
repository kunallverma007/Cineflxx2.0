import React,{useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import './SignUp_theater.css'

function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    const [city, setCity] =useState("");
    let history = useHistory();
    async function submit(){
        try{
            var token=await axios.post('/signup_theater',{username,password,email,city});
            
            history.push('/login_theater')

          }catch(err){
            alert(err.response.data)
        }
    }
    return (

      <div className="signup">
      <span className='signupTitle'>Register</span>
      <form className='signupForm'>
          <label>User Name</label>
          <input className="signupInput" type="text" placeholder="Username" value={username} onChange={({target})=>{ setUsername(target.value)}} required />
          <label>Email</label>
          <input className="signupInput" type="email" placeholder="Enter your email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
          <label>Password</label>
          <input className="signupInput" type="password" placeholder="Enter your password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
          <label>City</label>
          <input className="signupInput" type="text" placeholder="Enter your city" value={city} onChange={({target})=>{ setCity(target.value)}} required />
          <button className="signupButton" type="submit" onClick={submit}>Sign Un</button>
      </form>
      <button className="signinButton">Sign In</button>
      </div>
  
    )
}

export default SignUp_theater
