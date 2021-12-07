const Theater = require("../schemas/Theater");
const User=require("../schemas/User")
const Booking = require("../schemas/Booking")
//adds movie to theater
module.exports.show_movie = async(req,res)=>{   

    console.log(req.body);
    const { _id,movie_id,slot,prices } = req.body;
    try{
        let movie ={
            movie_id: movie_id,
            slots:slot,
            prices:prices
        }
        
        console.log(movie);
        await Theater.updateOne({_id:_id},{$push:{movies:[movie]}});
        res.status(200).send(req.body);
    }catch(err){
        console.log(err);
    }
}

//Fetch theater details movie 
module.exports.movie_shower = async(req,res)=>{
    const {movie_id,city} = req.body;
    
    var user=await Theater.find({});
    var details=[]
    user.forEach(en=>{
        if (en.city===city)
        {
            en.movies.forEach(en2=>{
                if (en2.movie_id===movie_id)
                {
                    details.push(en2);
                }
            })
        
        }
    })
    res.status(200).json(details);

}

//delete movie from theater
module.exports.movie_deleter = async(req,res)=>{
    
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
    const {user,movie_id,theater,slot,pack} = req.body;
    try
    {
        const booking=await Booking.create({user,movie_id,theater,slot,pack});

        await User.updateOne({ _id:user},{$push:{booking:[booking._id]}});
        await Theater.updateOne({username:theater},{$push:{booking:[booking._id]}});
        res.status(200).send("ok");
    }catch(err)
    {
        console.log(err);
        res.status(400);
    }
}

//confirm payment request
module.exports.confirm_payment=async(req,res)=>{
    const {booking_id} = req.body;
    try{
        await Booking.updateOne({ $set: {payment:true}})
        res.status(200);
    }catch(err){

        res.status(400).send(err);
    }
}


//get theaters history pending
module.exports.pending_history=async(req,res)=>{
    const {theater_id} = req.body;
    try{
        var booking= await Booking.find({});
        
        var theater = await Theater.find({_id:theater_id});
        theater=theater.username;
        var details=[];
        booking.forEach(en=>{
            if (en.theater===theater && en.payment===false){
                details.push(en);
            }
        })
        res.status(200).send(details);
    }
    catch(err){
        res.status(400).send(err);
    }
}

//get theaters history complete
module.exports.complete_history=async(req,res)=>{
    const {theater_id} = req.body;
    try{
        var booking= await Booking.find({});
        
        var theater = await Theater.find({_id:theater_id});
        theater=theater.username;
        var details=[];
        booking.forEach(en=>{
            if (en.theater===theater && en.payment===true){
                details.push(en);
            }
        })
        res.status(200).send(details);
    }
    catch(err){
        res.status(400).send(err);
    }
}


//get theater details
module.exports.theater_data=async(req,res)=>{
    const {_id}=req.body;
    try{            
        var user = await Theater.findOne({ _id:_id });
        res.status(201).json(user);      
    }catch(err){
        res.status(401).send(err);
    }
} 