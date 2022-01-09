import React,{useState,useEffect} from 'react'
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';

function BookingTheater() {
    
    const [booking,setBooking]=useState([]);
    let history = useHistory();
    const [users,setUser]=useState("")
    const [theater,setTheater]=useState("");

    
    const authorization= async ()=>{ 
        const {auth,type,user}=await IsAuth();
        console.log(auth,type,user)
        
        if (auth===false || type==="theater"){
            console.log(auth,type,user)
        }
        else{ 
            try{
                var x=await axios.post("/user",{_id:user})
                setUser(x.data.username)
                var y= await axios.post('/booking_of_user',{user_id:user});
                console.log(y)
                setBooking(y.data);
               
                
            }catch(err){
                console.log(err)
            }
        }
    }
  

    useEffect(()=>{
       authorization();
    },[])
    
    return (
        <div>
            <h1>Bookings :</h1>
            {booking.lenght===0?<div></div>:<div>
            {
                booking.map((en,key)=>{
                    console.log(en)
                    return (
                        <BookingCard
                            key={key}
                            movie_id = {en.movie_id}
                            Date = {en.Date}
                            slot={en.slot}
                            pack={en.pack}
                            theater={en.theater}
                            user={users}
                            user_id={en.user}
                            theater_id={en.theater}
                            payment={en.payment}
                            booking_id = {en._id}
                            type="0"
                            fan="theater"
                        />
                    );
                })
            }
            </div>

            }
            
        </div>
    )
}

export default BookingTheater
