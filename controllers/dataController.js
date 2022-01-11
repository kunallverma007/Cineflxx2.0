const Theater = require("../schemas/Theater");
const User=require("../schemas/User")
const Booking = require("../schemas/Booking")
const nodemailer= require('nodemailer');

const Movie=require("../schemas/Movie")
const axios = require('axios');
//adds movie to theater
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'cineflex4020@gmail.com',//our email here
        pass:'V-9BPpgpX_T9tCV', //our password here
    }
})
const sendMailOfPayment = async (user) => {
try {
    
    var mailoptions={
        from:"aman18sharma99@gmail.com",
        to:user.email,
        cc:"vermakunal088@gmail.com",
        subject:'',
        html:`<h1>Payment for booking ID ${user} was success</h1>`,
    } 
    transporter.sendMail(mailoptions,function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log("Email sent"+info.response);
        }
    });
} catch (err) {
    console.log(err);
    res.status(400).send(err);
}
}
const apology_mail = async (user_mail,theater_name,movie_title,date) => {
    try {
        
        var mailoptions={
            from:"cineflexx4020@gmail.com",
            to:user_mail,
            cc:"vermakunal088@gmail.com",
            subject:'',
            html:`<h1>Dear User your booking for ${movie_title} in ${theater_name} on ${date} is Cancelled and payment if done will be refunded </h1>`,
        } 
        transporter.sendMail(mailoptions,function(error,info){
            if(error){
                console.log(error);
            }else{
                console.log("Email sent"+info.response);
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}
module.exports.show_movie = async(req,res)=>{   

    // console.log(req.body);
    var { _id,movie_id,slot,prices,language,to,from } = req.body;

    to = to.slice(0,10)
    from = from.slice(0,10)
    try{
        let movie ={
            theater_id:_id,
            movie_id: movie_id,
            slots:slot,
            prices:prices,
            language:language,
            to,
            from
        }
        const new_movie=await Movie.create(movie)
        console.log(new_movie)
        console.log(new_movie._id.valueOf(),"ok")
        await Theater.updateOne({_id:_id},{$push:{movies:[new_movie._id.valueOf()]}});
        res.status(200).send(req.body);
    }catch(err){
        console.log(err)
        res.status(400).send(err.message);
    }
}
//Fetch theater details movie 
module.exports.movie_shower = async(req,res)=>{
    var {movie_id,city,date} = req.body;
    console.log(date)
    date = new Date(date)
    date = date.toISOString().slice(0,10)
    var details=[]
    try{
    var movies=await Movie.findByMovieId(movie_id);
    const get = async (en) => {
        
        
       
        if (date<=en.to.toISOString().slice(0,10) && date>=en.from.toISOString().slice(0,10)){
            
            var theater=await Theater.findBycity(en.theater_id,city);
            
            if (theater){
                
                var obj = {movie:en,theater}
                details.push(obj);
            }
        }
    }
    for (var i=0;i<movies.length;i++){
        await get(movies[i])
    }

    console.log(details)
    res.status(200).json(details)
}
catch(err){
    console.log(err.message)
}

}
//delete movie from theater
module.exports.movie_deleter = async(req,res)=>{
    const {_id,movie_id,language} = req.body;
    console.log(req.body)
    try{

        const movie=await Movie.findByPkey(movie_id,language,_id);
        console.log(movie)
        await Movie.deleteMany({_id:movie._id})
        
        await Theater.updateOne({_id:_id},{$pull:{movies:movie._id}});
        res.status(200).send("ok");
    }catch(err){
        console.log(err);
        res.status(400).send(err.message);
    }
}
//User details
module.exports.user_data = async(req,res)=>{
    const { _id } = req.body;
    
    try{
        var user = await User.findOne({ _id:_id });
        res.status(201).json(user);
    }catch(err){
        res.status(401).send(err);
    }
}
//adds booking to user
module.exports.booking_adder= async(req,res)=>{
    
    
    const {user,movie_id,theater,slot,pack,language,date} = req.body;

    console.log(user,movie_id,theater,slot,pack,language,date)
    var success=0;
    try
    {
        const booking=await Booking.create({user,movie_id,theater,slot,pack,language,Date:date});

        await User.updateOne({ _id:user},{$push:{booking:[booking._id]}});
        await Theater.updateOne({_id:theater},{$push:{booking:[booking._id]}});
        res.status(200).send("ok");
        
        success=1;
    }catch(err) 
    {
        console.log(err);
        res.status(400);
    }
    
}
//delete booking
module.exports.booking_deleter = async(req,res)=>{
    //movie_id here is user_id
    const {_id,movie_id,theater_id} = req.body;
    try{
       await User.findOneAndUpdate({ _id:movie_id},{$pullAll:{booking:[_id]}});
       await Theater.findOneAndUpdate({_id:theater_id},{$pullAll:{booking:[_id]}});
        await Booking.deleteOne({_id:_id})

    }catch(err){

        console.log(err.message)
    }
}
//confirm payment request
module.exports.confirm_payment=async(req,res)=>{
    const {booking_id} = req.body;
    var success=0;
    try{
        await Booking.updateOne({ $set: {payment:true}})
        res.status(200);
        

        success=1;
    }catch(err){

        res.status(400).send(err);
    }
    if (success){
        
        sendMailOfPayment(booking_id);
    }
}
//get theaters history pending
module.exports.pending_history=async(req,res)=>{
    const { _id } = req.body;
    try{
        
        var booking= await Booking.find({});
        var theater=_id
        
        
        var today=new Date()
        today=today.toISOString().slice(0,10);
        const get=async(en)=>{
            if (en.Date.toISOString().slice(0,10)<today){
                await axios.post("http://localhost:3001/delete_booking",{_id:en._id,movie_id:en.user,theater_id:en.theater})
            }
        }
        
       for (var i=0;i<booking.lenght;i++){
           await get(booking[i])
       }
        
        var details = await Booking.find({theater:theater,payment:false});
        
        res.status(200).json(details);
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
    }
}
//get theaters history complete
module.exports.complete_history=async(req,res)=>{
    const { _id } = req.body;
    try{
        var theater=_id
        
        var details = await Booking.find({theater:theater,payment:true});
        res.status(200).json(details);
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
}
}
//get theater details 
module.exports.theater_data=async(req,res)=>{
    const {_id}=req.body;
    async function get(_id){
        var x= await Movie.findOne({_id:_id})
        console.log(x)

        return x.toJSON()
    }
    try{            
        var x = await Theater.findOne({_id:_id });

        var user = x.toJSON()
        var flag=0;
        for (var i=0;i<user.movies.length;i++){
            flag=1;
            var x=await get(user.movies[i]);
            user.movies[i]=x
        }
        
        const new_user = {...user,flag:flag}
    
            res.status(201).json(new_user)
        console.log(new_user)
    
        
        
    }catch(err){
        console.log(err)
        res.status(401).json(err.message);
    }
} 
//get booking details user

module.exports.get_booking_data = async(req,res)=>{
    const {user_id} = req.body;
    try{
        var booking= await Booking.find({});
        var today=new Date();
        today=today.toISOString().slice(0,10);

        const get=async(en)=>{
            if (en.Date.toISOString().slice(0,10)<today){
                await axios.post("http://localhost:3001/delete_booking",{_id:en._id,movie_id:en.user,theater_id:en.theater})
            }
        }
        for (var i=0;i<booking.lenght;i++){
            await get(booking[i])
        }
         
        
        var details= await Booking.find({user:user_id});
      
        
        res.status(200).send(details);
  
    }
    catch(err){
        console.log(err)
        res.status(400).send(err.message);
    }

}
//test 
module.exports.edit = async(req,res)=>{
    var {_id,movie_id,slot,prices,language,to,from,theater_name,movie_title}=req.body;
    
    try{
        var movie = await Movie.findByPkey(movie_id,language,_id);
        movie.slot = slot;movie.prices=prices;movie.to = to;movie.from=from;
        movie.save()
        var theater = await Theater.findOne({_id:_id})
        to_date=to.slice(0,10)
        from_date=from.slice(0,10)
        theater.booking.forEach( async(en) => {
            var booking= await Booking.findOne({_id:en});
            var dast = booking.Date.toISOString().slice(0,10)
            var x=0;
            if (dast<from_date || dast>from_date || !slot.includes(booking.slot)  )
            {
                var user_mail=await User.findOne({_id:booking.user});
                user_mail=user_mail.email
                await apology_mail(user_mail,theater_name,movie_title,dast)
                var x=1;
            }
            console.log(x)
            if (x) {
                await axios.post("http://localhost:3001/delete_booking",{_id:en,movie_id:booking.user,theater_id:_id})
            }
        })
        res.status(200).send("All ok");
    }catch(err){
        console.log(err)
    }
}
//get slot data

module.exports.get_show =async(req, res)=>{
    const {theater_id,language,movie_id,date} = req.body
    
    try{
        var psSlot={}
        var slot = await Movie.findByPkeyAll(movie_id,language,theater_id);
        console.log(slot)
        for (var i=0;i<slot.length;i++){
            var to=slot[i].to.toISOString().slice(0,10)
            var from =slot[i].from.toISOString().slice(0,10)
            console.log(to,from)
            if (date<=to && date>=from){
                psSlot=slot[i].toJSON()
            }else{
                console.log("delete")
                await axios.post('/delete_movie',{_id:theater_id,movie_id:movie_id,language:language});
            }
        }
        res.status(200).send(psSlot);
    }catch(err){
        res.status(400).send(err.message)
    }
}