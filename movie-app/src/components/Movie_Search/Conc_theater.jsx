import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
import useGeoLocation from './useGeoLocation';
import { useParams } from 'react-router-dom';
function Conc_theater(props) {
    const [theaters,setTheaters]=useState([])
    const [city,setCity] = useState('')
    let history=useHistory();
    const location = useGeoLocation();
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
    
    const getLocation = async ()=>{
        console.log("op",city,location)
        if (city==='' && location.loaded){
            try{
                
                var response = await axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.6f585145ffdbe963de697efe0fa2c02a&lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&format=json`)
                // console.log(response.data.city)
                setCity(response.data.address.city)
                 
            }catch(err){
                console.log(location.error,"error")
                console.log(err)
            }
        }
    }
    useEffect(()=>{


        getLocation();
    },[theaters,location])
    
    if (theaters.lenght===0) return <div></div>
    else{
        console.log(theaters)
    return (
        <>
        <div className="movieBar">
                <h2>Enter City</h2>
                <input id = "movie" type="search" className="form-input"  aria-label="Search" aria-describedby="search-addon" onChange={({target})=>{ setCity(target.value)}} />
                <button onClick={ submit }>Submit</button>
        </div>
        <div className="movie-list">
            {
                theaters.map((en)=>
                {
                    var url = `/AddBooking/${en.theater._id}/${movie_id}/${en.movie.language}`;
                    return <div className="listItem parent" style={{padding:"10px"}}>
                            <h1><a href={url}>{en.theater.username}</a></h1><br/>
                            <h3>{en.movie.language}</h3>
                            <div>
                                <p>Platinum:{en.movie.prices[2]}</p>
                                <p>Gold:{en.movie.prices[1]}</p>
                                <p>Silver:{en.movie.prices[0]}</p>
                            </div>
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
