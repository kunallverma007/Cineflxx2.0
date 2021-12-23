import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
function SignUp() {
    let history=useHistory();

    return (
        <div>
            <button onClick={()=>{history.push('/signup_user')}}>User</button>
            <button onClick={()=>{history.push('/signup_theater')}}>Theater</button>
        </div>
    )
}

export default SignUp