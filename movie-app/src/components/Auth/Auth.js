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

        else if (localStorage.getItem("type")==="theater"){
            user = (await axios.post('/is_correct_theater', {token:localStorage.getItem('token')})).data;
            
            type="theater"
        }
        else{
            throw "nolocaldatapresent"
        }
        auth=true;
        
    }catch(err){
       auth=false;
       console.log(err);
    }
    return {auth,type,user};    
}
function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
}
export  {IsAuth,logOut}