import React,{useState,useEffect} from 'react'
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';

function BookingTheater() {
    
    const [complete,setComplete]=useState([]);
    const [pending,setPending]=useState([]);
    const [theater,setTheater]=useState("");
    let history = useHistory();

    const authorization= async ()=>{ 
        const {auth,type,user}=await IsAuth();
        console.log(auth,type,user);
        if (auth===false || type==="user"){
            history.push('/login')
        }
        else{
            try{
                var x=await axios.post('/theater',{_id:user})
                setTheater(x.data.username)
                var y= await axios.post('/pending',{_id:user});
                setPending(y.data);
                
                var z= await axios.post('/complete',{_id:user});
                setComplete(z.data);
            }catch(err){
                console.log(err)
            }
        }
        console.log(pending,complete);
    }
  
   
     useEffect(()=>{
        authorization();
    },[])

    return (

        <div>
            <h1>Pending :</h1>
            {
                pending.map((en,key)=>{
                    console.log(en.payment)
                    return (
                        <BookingCard
                            key={key}
                            movie_id = {en.movie_id}
                            Date = {en.Date}
                            slot={en.slot}
                            pack={en.pack}
                            theater={theater}
                            user={en.user}
                            payment={en.payment}
                            booking_id = {en._id}
                            type="1"
                            fan="user"
                      />
                    );
                })
            }
            <h1>Complete :</h1>
            {
                complete.map((en,key)=>{
                    return (
                        <BookingCard
                            key={key}
                            movie_id = {en.movie_id}
                            Date = {en.Date}
                            slot={en.slot}
                            pack={en.pack}
                            theater={theater}
                            payment={en.payment}
                            type="0"
                            user={en.user}
                            user_id={en.user}
                            theater_id={en.theater}
                            fan="user"
                            booking_id={en._id}
                        />
                    );
                })
            }
        </div>
    )
}

export default BookingTheater
