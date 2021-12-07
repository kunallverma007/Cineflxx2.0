const express = require('express');
const app = express();
const dotenv =require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')
//config dotenv and connect to database
dotenv.config();
mongoose.connect(process.env.DB_CONNECT_URI,{},()=>console.log('connected to db'));

//middleware
app.use(express.json());
app.use(authRoutes);
app.use(cors());
//this is ununderstandable
// if (process.env.NODE_ENV==="production"){
// 	app.use(express.static("client/build"));
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// 	  });
// }

//set up the server
app.listen(3001,()=>{
    console.log("server running on 3001");
})