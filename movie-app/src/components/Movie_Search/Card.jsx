import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {IsAuth} from '../Auth/Auth'

import './search.css'
import '../Movies/new.css'
function Card(props) {
    const [movie_data,setMovie_data]=useState({});
    let history=useHistory();
    var type=localStorage.getItem("type")
    const get=async ()=>{
        
        var url=`https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US`
    
        var x=await axios.get(url);
        setMovie_data(x.data)
        console.log(movie_data)
    }
    const showTheater=()=>{

        var url="/show_movie"+"/"+props.movie_id.toString();
        history.push(url);
        
    }
    const addBooking=()=>{
        var url="/conc"+"/"+props.movie_id.toString();
        history.push(url);
    }
    function set(s){
        if (s===undefined) return ""
        if (s.length>100){
            s=s.slice(0,100)
            s=s.concat("....")
        }
        return s
    }
    function MovieP(){
        history.push(`/Movieprofile/${movie_data.id}`)
    }
    useEffect(()=>{
        get()
    },[])
    return (
        <div>
             <div className="listItem parent">
                <img onClick={MovieP} className="child" src={`https://www.themoviedb.org/t/p/original${movie_data.poster_path}`} alt="moviePoster"/>
                <div className="child">
                    <h3>{movie_data.original_title}</h3>
                    <p>{movie_data.release_date}</p>
                    <p>{set(movie_data.overview)}</p>
                    <div className="text-box">
                    {
                 
                        (type==="user")?<button type="submit"  onClick={addBooking}>Watch Now</button>:<button type="submit"  onClick={showTheater}>Show Now</button>
                    }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Card
