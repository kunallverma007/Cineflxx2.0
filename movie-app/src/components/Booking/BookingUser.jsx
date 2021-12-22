import React,{useState,useEffect} from 'react'
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';

function BookingTheater() {
    
    const [booking,setBooking]=useState([]);
    let history = useHistory();

    const authorization= async ()=>{ 
        const {auth,type,user}=await IsAuth();
        // setAuth(x.auth);setUser(x.user);setType(x.type);
        console.log(auth,type,user)
        
        if (auth===false || type==="theater"){
            //  history.push('/login_theater');
            console.log(auth,type,user)
        }
        else{ 
            try{
                var y= await axios.post('/booking_of_user',{user_id:user});
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
            {
                booking.map((en)=>{
                    console.log(en.payment)
                    return (
                        <BookingCard
                            movie_id = {en.movie_id}
                            Date = {en.Date}
                            slot={en.slot}
                            pack={en.pack}
                            theater={en.theater}
                            payment={en.payment}
                            booking_id = {en._id}
                            type="0"
                        />
                    );
                })
            }
            
        </div>
    )
}

export default BookingTheater
