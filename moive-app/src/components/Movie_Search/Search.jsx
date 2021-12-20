import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Card from './Card.jsx'
function Search() {
    const [movie,setMovie]=useState("");
    const [movies,setMovies]=useState([]);

    async function submit()
    {
        try{
            const url=`https://api.themoviedb.org/3/search/movie?api_key=6f63772ed65e8e432bd7e974f7a69540&language=en-US&query=${movie}&page=1&include_adult=false`;
            var x=await axios.get(url);
            
            setMovies(x.data.results);
           // console.log(x.data.results);
        }catch(err){
            console.log(err);
        }
        
    }

    useEffect(()=>{
        submit();
    },[])
    if (movies.lenght===0) return <div></div>;
    else{
    return (
        <div>
            <div>
                <input type="text" value={movie} onChange={({target})=>{setMovie(target.value)}}></input>
            </div>
            <button type="submit" onClick={submit}>Search</button>
            <div>
                {
                    movies.map((en,index) => {
                        return <Card 
                            movie_id={en.id}
                            key={index}
                        />
                    })
                }
            </div>
        </div>
    )
            }
}

export default Search
