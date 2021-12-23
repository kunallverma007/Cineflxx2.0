import React,{useState,useEffect} from 'react'
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import BookingCard from './BookingCard';

function BookingTheater() {
    
    const [complete,setComplete]=useState([]);
    const [pending,setPending]=useState([]);
    let history = useHistory();

    const authorization= async ()=>{ 
        const {auth,type,user}=await IsAuth();
        console.log(12)
        if (auth===false || type==="user"){
            console.log(auth,type,user)
        }
        else{
            try{
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
                pending.map((en)=>{
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
                            type="1"
                      />
                    );
                })
            }
            <h1>Complete :</h1>
            {
                complete.map((en)=>{
                    return (
                        <BookingCard
                            movie_id = {en.movie_id}
                            Date = {en.Date}
                            slot={en.slot}
                            pack={en.pack}
                            theater={en.theater}
                            payment={en.payment}
                            type="0"
                        />
                    );
                })
            }
        </div>
    )
}

export default BookingTheater
