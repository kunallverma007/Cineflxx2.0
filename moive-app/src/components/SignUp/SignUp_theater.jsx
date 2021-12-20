import React,{useState} from 'react'
import axios from 'axios'
function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    const [city, setCity] =useState("");
    async function submit(){
        try{
            var token=await axios.post('/signup_theater',{username,password,email,city});
            localStorage.setItem("token",token);
            localStorage.setItem("type","theater")

        }catch(err){

            console.log(err)
        }
    }
    return (

        <form>
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
        <div>
          <label>City</label>
          <input type="text" name="city" value={city} onChange={({target})=>{ setCity(target.value)}} required />
        </div>
        <button type="submit" onClick={submit}>Sign Up</button>
      </form>
  
    )
}

export default SignUp_theater
