import React from 'react'

function Loader() {
    return (

        <div style={{ backgroundColor:"#232a30",width: "100%", height: "100vh",display:"flex" ,justifyContent:"center",alignItems:"center"}}>
        <div
          style={{
            width: "35%",
            height: "50%",        
            background:
              "url('https://media.giphy.com/media/xT39D3pHl63aiQh2De/giphy.gif')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
           
          }}
        ></div>
      </div>
    )
}

export default Loader