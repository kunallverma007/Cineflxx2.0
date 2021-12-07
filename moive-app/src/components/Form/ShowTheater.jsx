import React,{useState} from 'react';
import Select from 'react-select';
import axios from 'axios';
import {IsAuth} from './../Auth/Auth'

import { useParams } from 'react-router-dom';
function ShowTheater() {
    const options=[ ]
    
    const {movie_id} = useParams();
    console.log(movie_id)
    
    const [timings,setTimings]=useState([]);
    for (var i=0;i<24;i++){
        var time=i.toString() + ":00";
        var new_time = i.toString()+":30";
        options.push({value:time,label:time })
        options.push({value:new_time,label:new_time })
    }
    async function submit(){
        const {auth,type,user}=await IsAuth();

        var time=[];
        timings.forEach((en)=>{time.push(en.value)})

     
        const data={_id:user,movie_id:movie_id,slot:time,prices:[100,200,300]};
        
        await axios.post('/show',data)
        
    }
    return (
        <div>
            
            <Select options= {options} onChange={(value)=>{setTimings(value);}} isMulti/>
            <button type="submit" onClick={submit}>Submit</button>
        </div>
    )
}

export default ShowTheater
