import axios from 'axios'
async function IsAuth(){
    var user="";
    var type="";
    var auth = "";
    try{
        if (localStorage.getItem("type")==="user")
        {
            user=(await axios.post('/is_correct_user', {token:localStorage.getItem('token')})).data;
            
            type="user"
        }
        else{
            user = (await axios.post('/is_correct_theater', {token:localStorage.getItem('token')})).data;
            
            console.log(user);
            type="theater"
        }
        auth=true;
        
    }catch(err){
        // localStorage.removeItem("token");
       // localStorage.removeItem("type");
       auth=false;
       console.log(err);
    }
  //  console.log(auth,user,type);
    return {auth,type,user};    
}



function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
}
export  {IsAuth,logOut}
