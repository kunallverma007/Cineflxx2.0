import React, {useState} from 'react'
import back from "../Assests/witcher.jpg";
import { useHistory } from 'react-router-dom';
export default function Mainbg()
{
   
    let history = useHistory();
    function HandleSubmit()
    {
        history.push(`/search`);
    }
    return (
        <>
        <div className="mainback" style={{backgroundImage:`url(${back})`}}>        
        <div style={{width:"100%",height:"100%",display:"inline-block"}}>
        <div className="mfp-hide" style={{marginLeft:"3%",marginTop:"2%"}}>
        <h2 style={{color:"white",padding:"5px 20px",fontFamily:"Lato, sans-serif",fontSize:"5rem"}}>Welcome</h2>
        <h3 style={{color:"white",padding:"5px 20px",fontFamily:"Lato, sans-serif",fontSize:"30px"}}>Millions of movies, TV series and people to discover. Explore now.</h3>
       </div>
        <input
        type = "text"       
        placeholder="Search for..." 
        className="homeSearch"
        style={{width: "90%",borderRadius: "30px",height: "10%",margin:"3.5%",marginTop:"10%",padding:"20px",backgroundColor: "rgba(0, 0, 0, 0)",borderColor:"white"}}
        onChange={()=>{history.push('/search')}}    
        onKeyPress={event => {
                if(event.key === 'Enter')
                {  
                  HandleSubmit();                                                     
                }
            }} 
        /> 
        </div>          
        </div>  
        
        </>
       
        
         
    )
}