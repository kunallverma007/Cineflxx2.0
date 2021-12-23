import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
function SignIn() {
    let history=useHistory();

    return (
        <div>
            <button onClick={()=>{history.push('/login_user')}}>User</button>
            <button onClick={()=>{history.push('/login_theater')}}>Theater</button>
        </div>
    )
}

export default SignIn
