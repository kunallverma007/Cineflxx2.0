import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { IsAuth } from '../Auth/Auth';
import {useHistory,Link} from 'react-router-dom';

import Loader from "../Loader/Loader"
import './a.css'
function Profile_theater() {
    const [theater,setTheater]=useState({username:"",movies:[]});
    const [loaded,setLoaded]=useState(false)
    let history = useHistory();
    
    const [movie,setMovie] = useState([])
    async function get(){
        var {auth,type,user}=await IsAuth();
        if (type==="user" || auth===false){

            history.push("/login")
        }
        var x=await axios.post('/theater',{_id:user})
        console.log(x)
        if (x.data.flag===0){
            console.log("Found no movies")
            setLoaded(true);
            
            console.log(movie.length)
            return;
        }
        else{
            setTheater(x.data);
            if (x.data.movies.length!==0){
                await get_movie();
            
            }
        }
        
        
    }
     
    async function get_movie(){
        console.log(movie)
        if (movie.length===0)
        {      
            var obj=[]
            console.log("movies",theater.movies)
            for (var i=0;i<theater.movies.length;i++)
            {
                // theater.movies[i]=JSON.parse(theater.movies[i])
                console.log(theater.movies[i])
                var url = `https://api.themoviedb.org/3/movie/${theater.movies[i].movie_id}?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US`
            
                try{
                    var x=await axios.get(url);
                    obj.push({id:theater.movies[i].movie_id,title:x.data.title,language:theater.movies[i].language,backdrop_path:x.data.backdrop_path,slots:theater.movies[i].slots,prices:theater.movies[i].prices,to:theater.movies[i].to,from:theater.movies[i].from,username:theater.username});
                }catch(err){
                    console.log(err)
                }
            }
            setMovie(obj)
            console.log("movie",obj)
            setLoaded(true)
        }
    }
    async function movie_delete(id,language){
        try{
            await axios.post('/delete_movie',{_id:theater._id,movie_id:id,language})
            history.push("/theater_data")
        }catch(err){
            alert("movie cannot be deleted!");

        }

    }
    function Rstring(str) {
        return str.split("").reverse().join("");
    }
    function Slots(props){
        return (
            
            <div>
                {
                   props.picture.slots.map((en,key)=>{
                       var s=Rstring(en.toString())
                       
                       var x=s.slice(0,2)
                       x=Rstring(x)
                       var y=s.slice(2,s.lenght)
                       y=Rstring(y)
                       y=y.concat(":")
                       en=y.concat(x)

                       return(
                            <p>{en}</p>
                       );
                   })
                }
            </div>
        )
    }

    function Prices(props){
        return (
            <div>
                <h6>Platinum : ₹{props.picture.prices[2]}</h6>
                <h6>Gold : ₹{props.picture.prices[1]}</h6>
                <h6>Silver : ₹{props.picture.prices[0]}</h6>
            </div>
        );
    }
    useEffect(() => {
        get();
    }, [movie])
    
    if (loaded===false){
        return <Loader/>
    }
    else{ 

        if (movie.length===0){
            return <div><h1>No movie showing currently</h1></div>
        }
        else{
    return (
       <div>
            <h1>{theater.username}</h1>
            <h2>Now Showing</h2>
            {
                movie.map(en=>{

                    
                    
                    return(
                    
                    
                    <div className="card" style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${en.backdrop_path})`}}>
                        <div className="inner">
                            <h2 className="title">{en.title}</h2>
                            <h4 className='title'>{en.language}</h4>
                           {    
                               <div>
                                <Slots
                                    picture={en}
                                />
                                <Prices
                                    picture={en}
                                />
                                </div>
                           }
                        </div>
                        <button className="deleteBtn" onClick={()=>{ movie_delete(en.id,en.language) }}>Delete</button>
                        <Link className="deleteBtn" to={{ pathname: "/edit" ,en }}>Edit</Link>

                    </div>
  
                    )
                })
            }
        </div>
    )}
}
}

export default Profile_theater
