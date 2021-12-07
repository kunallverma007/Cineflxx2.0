import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {IsAuth} from '../Auth/Auth'
function Card(props) {
    const [movie_data,setMovie_data]=useState({});
    const [auth,setAuth] = useState(false);
    const [user,setUser]=useState({});
    const [type,setType]=useState('');
    let history = useHistory();
    const authorization= async ()=>{
        const x=await IsAuth();
        setAuth(x.auth);setUser(x.user);setType(x.type);
    }
    const get=async ()=>{
        
        var url=`https://api.themoviedb.org/3/movie/${props.movie_id}?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US`
    
        var x=await axios.get(url);
        setMovie_data(x.data)
    }
    const addBooking=()=>{

        var url="/add_booking"+"?movie_id="+props.movie_id.toString();
        history.push(url);
        
    }
    const showTheater=()=>{
        var url="/show_movie"+"?movie_id="+props.movie_id.toString();
        history.push(url);
    }
    useEffect(()=>{
        authorization();
        get();
    },[])
    return (
        <div>
            <h1>{movie_data.title}</h1>
            {
                 
            (type==="user")?<button type="submit" onClick={addBooking}>Watch Now</button>:<button type="submit" onClick={showTheater}>Show Now</button>

            

            //<button type="submit" onClick={showTheater}>Show Now</button>
            }
        </div>
    )
}

export default Card
