import React from 'react'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
function Test() {
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

    return (
        <div>
            
            <GoogleLogin
                clientId="1095483584862-to18ei3hbu77vf6tpd558crcnsjdper7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => {
                   google_submit(response)
                }}
                onFailure={(err)=>{console.log(err)}}
            />
        </div>
    )
}

export default Test
