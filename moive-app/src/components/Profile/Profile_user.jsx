import axios from '../../Api/axios_back'
import React,{useState,useEffect} from "react";

const Profile_user = () => {
    const [user,setUser] = useState({});
    useEffect(()=>{
        try{
                const get_user = async()=>{
                    var _id=localStorage.getItem("user")
                    var temp=await axios.post("/user",_id)
                    setUser(temp);
                }
                get_user();
        }catch(err)
        {
            console.log(err);
        }
    },[]);
    return (
        <div>
            <h1>Email:{user.email}</h1>
            
            <>
                {
                    user.cart.map(en =>{
                        <p>en.movie_id</p>
                    })
                }
            </>
        </div>
    )
}

export default Profile_user
