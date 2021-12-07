import React,{useState} from 'react'
import Select from 'react-select';
import axios from 'axios';
import {useParams} from 'react-router-dom'
function AddBooking() {
    const {theater_id,movie_id} = useParams();
    var options =[ ];
    var prices=[];
    async function get(){
        
        var user = await axios.post('/theater',{_id:theater_id})
        user.movies.forEach((en)=>{
            if (en.movie_id===movie_id) 
            {

                options=en.slot;
                prices=en.prices;
            }

        })
    }   
    get();
    return (
        <div>
            <Select options={options} />
            <Select options={prices} />
        </div>
    )
}

export default AddBooking
