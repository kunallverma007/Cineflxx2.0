import React,{useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import './SignUp_theater.css'

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'
function SignUp_theater() {
    const [username, setUsername] =useState("");
    const [password, setPassword] =useState("");
    const [email, setEmail] =useState("");
    const [city, setCity] =useState("");
    let history = useHistory();
    
    const [text,setText]=useState("");
    const [open,setOpen] = useState(false)
    async function submit(){
        try{
            var token=await axios.post('/signup_theater',{username,password,email,city});
            
            history.push('/login_theater')
           console.log("received")

          }catch(err){
            setText(err.response.data)
            setOpen(true)  
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
      <Snackbar open={open} autoHideDuration={4000} onClose={()=>{setOpen(false)}} anchorOrigin={ {vertical: 'top', horizontal: 'center'} }>
        <Alert onClose={()=>{setOpen(false)}} severity="error" sx={{ width: '400px',fontSize: '20px'}}>
            <AlertTitle sx={{fontSize: '20px'}}> Careful </AlertTitle>
          {text}
        </Alert>
      </Snackbar>
      </div>
    )
}

export default SignUp_theater
