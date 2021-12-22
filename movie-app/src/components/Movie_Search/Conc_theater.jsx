import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';


import { useParams } from 'react-router-dom';
function Conc_theater(props) {
    const [theaters,setTheaters]=useState([])
    const [city,setCity] = useState('')
    let history=useHistory();
   
    const {movie_id}=useParams();
    const submit=async()=>{
        
        const {auth,type,user}=await IsAuth();

        console.log(auth,type,user)
        if (auth===false || type==="theater") 
        {
            history.push('/login');
            return;
        }
        const data={
            movie_id:movie_id,
            city:city
        };

        var x=await axios.post('/fetch_theater',data);
        
        setTheaters(x.data)
    }
    useEffect(()=>{

    },[theaters])
    
    if (theaters.lenght===0) return <div></div>
    else{
        console.log(theaters)
    return (
        <>
        <div>
            <input type="text" onChange={({target})=>{ setCity(target.value)}}/>
            
            <button onClick={submit}>Search</button>
        </div> 
        <div>
            {
                theaters.map((en)=>
                {
                    var url = `/AddBooking/${en.theater._id}/${movie_id}/${en.movie.language}`;
                    return <div>
                        <h1><a href={url}>{en.theater.username}</a></h1>
                        <h4>{en.movie.language}</h4>
                        <p>Platinum:{en.movie.prices[2]}</p>
                        <p>Gold:{en.movie.prices[1]}</p>
                        <p>Silver:{en.movie.prices[0]}</p>
                    </div>
                }
            )
            }
        </div>
        </>
    )
        }
}

export default Conc_theater
