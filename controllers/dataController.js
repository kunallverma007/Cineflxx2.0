const Theater = require("../schemas/Theater");
const User=require("../schemas/User")
const Booking = require("../schemas/Booking")
const nodemailer= require('nodemailer');

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

    console.log(req.body);
    var { _id,movie_id,slot,prices,language,to,from } = req.body;
    to =new Date(to);

    from = new Date(from);

    
    try{
        let movie ={
            movie_id: movie_id,
            slots:slot,
            prices:prices,
            language:language,
            to,
            from
        }
        await Theater.updateOne({_id:_id},{$push:{movies:[movie]}});
        res.status(200).send(req.body);
    }catch(err){
        console.log(err);
    }
}
//Fetch theater details movie 
module.exports.movie_shower = async(req,res)=>{
    var {movie_id,city,date} = req.body;
    console.log(date)
    date = new Date(date)
    date = date.toISOString().slice(0,10)
    
    var user=await Theater.find({});
    var details=[]
    user.forEach(en=>{
        if (en.city===city)
        {
            en.movies.forEach(en2=>{
                // console.log( en2.from.toISOString().slice(0,10),en2.to.toISOString().slice(0,10) >=date)
                if (en2.movie_id===movie_id && en2.from.toISOString().slice(0,10) <= date && en2.to.toISOString().slice(0,10) >=date)
                {   
                    var obj = {movie:en2,theater:en}
                    details.push(obj);
                }
            })
        
        }
    })
    console.log(details)
    res.status(200).json(details);

}
//delete movie from theater
module.exports.movie_deleter = async(req,res)=>{
    console.log(req.body)
    const {_id,movie_id,language} = req.body;
    try{
        const theater = await Theater.find({_id:_id});
        const movies = theater[0].movies;
        let i = 0;
        while (i < movies.length)
        {
            if (movies[i].movie_id === movie_id && movies[i].language === language)
                movies.splice(i,1);
            else
                i ++;
        }
        await Theater.updateOne({_id:_id},{$set:{movies:movies}});
        res.status(200).send("ok");
    }catch(err){
        console.log(err);
        res.status(400);
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
        var x=await User.findOneAndUpdate({ _id:movie_id},{$pullAll:{booking:[_id]}});
        var x=await Theater.findOneAndUpdate({_id:theater_id},{$pullAll:{booking:[_id]}});

        await Booking.deleteOne({_id:_id})

    }catch(err){

        console.log(err)
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
        const today=new Date()
        booking.forEach(async(en)=>{
            console.log("day",en.Date.getDay())
            if (en.Date.getDay()<today.getDay()){
                var x=await User.findOneAndUpdate({ _id:en.user},{$pullAll:{booking:[_id]}});
                var x=await Theater.findOneAndUpdate({_id:en.theater},{$pullAll:{booking:[_id]}});
                await Booking.deleteOne({_id:en._id})
            }
        })
        booking= await Booking.find({});
        var details=[];
        booking.forEach(en=>{
            if (en.theater===theater && en.payment===false){
                
                details.push(en);
            }
        })
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
        var booking= await Booking.find({});
        var theater=_id
        const today=new Date()

        console.log("today",today)
        booking.forEach(async(en)=>{
            console.log(en.Date.getDay())
            if (en.Date.getDay()<today.getDay()){
                var x=await User.findOneAndUpdate({ _id:en.user},{$pullAll:{booking:[_id]}});
                var x=await Theater.findOneAndUpdate({_id:en.theater},{$pullAll:{booking:[_id]}});
                await Booking.deleteOne({_id:en._id})
            }
        })
        var booking= await Booking.find({});
        var theater=_id
        
        var details=[];
        booking.forEach(en=>{
            if (en.theater===theater && en.payment===true){
                
                details.push(en);
            }
        })
        // console.log(details)
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
    // console.log("id",_id)
    try{            
        var user = await Theater.findOne({_id:_id });
        // console.log(user)
        res.status(201).json(user);      
    }catch(err){
        console.log(err)
        res.status(401).json(err);
    }
} 
//get booking details user
module.exports.get_booking_data = async(req,res)=>{
    const {user_id} = req.body;
    try{
        var booking= await Booking.find({});
        const today=new Date();
        console.log("today",today)
        booking.forEach(async(en)=>{
            console.log("date",en.Date.getDay())
            if (en.Date.getDay()<today.getDay()){
                var x=await User.findOneAndUpdate({ _id:en.user},{$pullAll:{booking:[_id]}});
                var x=await Theater.findOneAndUpdate({_id:en.theater},{$pullAll:{booking:[_id]}});
                await Booking.deleteOne({_id:en._id})
            }
        })
        booking= await Booking.find({});
        var details=[];
        booking.forEach(en=>{
            if (en.user===user_id){
                details.push(en);
            }
        })
        res.status(200).send(details);
        // console.log(details)
    }
    catch(err){
        res.status(400).send(err);
    }

}
//test 
module.exports.edit = async(req,res)=>{
    var {_id,movie_id,slot,prices,language,to,from,theater_name,movie_title}=req.body;
    
    try{
        await axios.post('http://localhost:3001/delete_movie',{_id,movie_id,language})
        await axios.post('http://localhost:3001/show',{_id,movie_id,slot,prices,language,to,from})
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