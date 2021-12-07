import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {IsAuth} from '../Auth/Auth'
import {useHistory} from 'react-router-dom';
function Conc_theater(props) {
    const [theaters,setTheaters]=useState([])
    const [city,setCity] = useState('')
    let history=useHistory();
   
  //  console.log(auth,user,type);
   // if (!auth) history.push('/login');
    const submit=async()=>{
        
        const {auth,type,user}=await IsAuth();


        if (auth===false) 
        {
            history.push('/login');
            return;
        }
        //console.log(x)
        const data={
            movie_id:props.movie_id,
            city:city
        };

        var x=await axios.post('/fetch_theater',data);
        console.log(x);
        setTheaters(x.data)
    }
    useEffect(()=>{
        //console.log(theaters)

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
                    return <div>
                        <h1>{en.user.name}</h1>
                        <p>Platinum:{en.movies.prices[2]}</p>
                        <p>Gold:{en.movies.prices[1]}</p>
                        <p>Silver:{en.movies.prices[0]}</p>
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
