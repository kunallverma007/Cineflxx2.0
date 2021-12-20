import React from 'react'
import {IsAuth} from './components/Auth/Auth'
function Test() {
     
    async function test(){
        const {auth,type,user}=await IsAuth();
        console.log(auth,type,user);
        
    }
    test();
    
    return <div></div>; 
   
}

export default Test
