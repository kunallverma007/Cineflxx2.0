import React from 'react'
import {useHistory} from "react-router-dom"
function Booking() {
    let history = useHistory();

    try{

        if (localStorage.getItem("type")==="user") history.push("/booking_user")
        else{
            history.push("/booking_theater")
        }
    }catch(err){
        history.push("/login")
    }
    return (
        <div>
            
        </div>
    )
}

export default Booking
