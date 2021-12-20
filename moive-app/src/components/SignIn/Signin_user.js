import React,{useState} from 'react';
import axios from 'axios';
function Signin_user() {
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    async function submit(){
        try{
            var token=await axios.post('/signin_user',{password,email});
            localStorage.setItem("token",token.data);
            localStorage.setItem("type","user")

        }catch(err){

            console.log(err)
        }
    }
    return (
        <div>
            <div>
          <label>Email</label>
          <input type="email" name="Email" value={email} onChange={({target})=>{ setEmail(target.value)}} required />
        </div>
        
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={({target})=>{ setPassword(target.value)}}/>
        </div>
        <button type="submit" onClick={submit}>Sign Up</button>
        </div>
    )
}

export default Signin_user
