import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { IsAuth } from '../Auth/Auth';
import {useHistory} from 'react-router-dom';

function Profile_theater() {
    const [theater,setTheater]=useState({username:"",movies:[]});
    let history = useHistory();
    async function get(){
        var {auth,type,user}=await IsAuth();
        var x=await axios.post('/theater',{_id:user})
        setTheater(x.data);
        
        await get_movie();
    }
    const [movie,setMovie] = useState([])
     
    async function get_movie(){
        var obj=[]
        //console.log(theater)
        for (var i=0;i<theater.movies.length;i++)
        {

        
            var url = `https://api.themoviedb.org/3/movie/${theater.movies[i].movie_id}?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US`
            var x=await axios.get(url);
            // console.log(x.data)
            obj.push({id:theater.movies[i].movie_id,title:x.data.title,language:theater.movies[i].language});
        }
        setMovie(obj)
        console.log(movie)
    }
    async function movie_delete(id,language){
        try{
            await axios.post('/delete_movie',{_id:theater._id,movie_id:id,language})
            history.push("/")
        }catch(err){
            alert("movie cannot be deleted!");
        }

    }
    useEffect(() => {
        get();
        
    }, [])
    

    return (
        <div>
            <h1>{theater.username}</h1>
            <h2>Now Showing</h2>
            {
                movie.map(en=>{

                    return(
                    <div>
                        <h1>{en.title}</h1>
                        <h2>{en.language}</h2>
                        <button onClick={()=>{ movie_delete(en.id,en.language) }}>Delete</button>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default Profile_theater
