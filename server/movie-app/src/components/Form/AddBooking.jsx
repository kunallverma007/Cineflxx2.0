import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import "./AddBooking.css"

function AddBooking() {
    const {theater_id,movie_id,language,date} = useParams();
    console.log(theater_id,movie_id,language,date)
    var options=[]
    var prices=[]
    var chck=0
    function RString(str) {
        return str.split('').reverse().join('')
     }
     function current_time()
     {
        const d= new Date().toString();
        const time= d.split(" ")[4].split(":");
        return parseInt(time[0]+time[1],10);
     }
    let history=useHistory();
    const [slot,setSlot]=useState();
    const [price,setPrice]=useState();
    async function get(){
        
        var user = await axios.post('/theater',{_id:theater_id})
        let currDate=new Date();
        
        if (currDate.toISOString().slice(0,10)===date)
        {
            var curr=current_time()
        }
        else{
            var curr="0000"
        }

        
        user.data.movies.forEach((en)=>{
            
            if (en.movie_id===movie_id && en.language===language ) 
            {
                
                en.slots.forEach((en1)=>{
                    var x=RString(en1);
                    
                    var xx=RString(x.substring(0,2))
                   
                   var yy=RString(x.substring(2,))
                   yy=yy.concat(":")
                  
                   yy= yy.concat(xx)
                   console.log(en1)
                    if (en1>curr)
                    {   
                        chck=1
                        options.push({value:en1,label:yy})
                    }
                })
                en.prices.forEach((en1)=>{
                    prices.push({value:en1,label:en1})
                })
            }

        })
        
        if (chck===0) {
            history.push("/")
        }
    }   
   async function submit(){
       try{
           var {auth,type,user}=await IsAuth();
           await axios.post('/booking_add',{user,movie_id,theater:theater_id,slot:slot.value,pack:price.value,language,date:new Date()})
           alert("Booking is added successfully redirecting in 6 secs")
           await new Promise(r => setTimeout(r, 4000));
           history.push("/")
       }catch(err){

            console.log(err)
            history.push('/login')
       }
   }
   
    useEffect(()=>{
        get();
        
    },[slot,price]);
    
    return (
        <div className="addBooking">
            <span className="addBookingTitle">Ticket Booking Details</span>
            <div className="addBookingForm">
            <label>Choose Time Slot: </label>
            <Select className="addBookingClass" options={options}  onChange={(value)=>{setSlot(value);}}/>
            <label>Choose Ticket Price: </label>
            <Select className="addBookingClass" options={prices}  onChange={(value)=>{setPrice(value);}} />
            <button className="addBookingbutton" type="submit" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default AddBooking
