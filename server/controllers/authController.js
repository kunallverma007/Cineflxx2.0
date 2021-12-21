const User= require('../schemas/User');
const Theater=require('../schemas/Theater')
const jwt = require('jsonwebtoken');
const nodemailer= require('nodemailer');

//send verification email
const transporter=nodemailer.createTransport({
  service:'gmail',
  auth:{
      user:'',//our email here
      pass:'', //our password here
  }
});

const sendMail = async (type,user) => {
  try {
    var link="https://ezy-mail1.herokuapp.com/verify/"+user._id;
    var mailoptions={
        from:"ezymail.mailer@gmail.com",
        to:user.email,
        cc:"vermakunal088@gmail.com",
        subject:'',
        html:"<a href="+link+">Click here to verify</a>",
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
// create json web token
const maxAge =  60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
};
module.exports.signup_user=  async (req,res)=>
{   
    const {email,password,username} = req.body;
    queryObject = await User.find({email:email});
    if (queryObject.length != 0)
    {
        res.status(400).send("Email already registered!!")
    }
    else{
      try{

          const user=await User.create({email,password,username});
          await sendMail("user",user);
          const token=createToken(user._id);
          res.status(201).send(token);
      }catch(err){
          res.status(400).send(err);
      }
  }
}
module.exports.signin_user=async (req,res)=>
{
    const {email,password} = req.body;
    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        if (user.verified===false){
          res.status(400).send("user is not verified")
        }
        else{
          res.status(201).send(token);
        }
    }catch(err){
      res.status(400).send(err.message)
    }
}
module.exports.signup_theater=async (req,res)=>
{

    const {email,password,username,city} = req.body;
    queryObject = await Theater.find({email:email});
    if (queryObject.length != 0)
    {
        res.status(400).send("Email already registered!!")
    }
    else{
      try{
          const user=await Theater.create({email,password,username,city});
          await sendMail("theater",user);
          const token=createToken(user._id);
          res.status(201).json({token});
      }catch(err){
          res.status(400).send(err)
      }
  }
}
module.exports.signin_theater=async (req,res)=>
{
    const {email,password} = req.body;
    try{
        const user=await Theater.login(email,password);
        const token=createToken(user._id);
        if (user.verified===false){
          res.status(400).send("user is not verified")
        }
        res.status(201).send(token);
    }catch(err){
        
        res.status(400).send(err.message)
    }   
}
module.exports.is_correct_user=async (req,res)=>
{
    const {token} = req.body;
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return res.status(200).send(decoded.id);
    }catch(err){
      return res.status(401).send("Invalid Token");

    }   
}
module.exports.is_correct_theater=async (req,res)=>
{
    const {token} = req.body;
    console.log(token);
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log(decoded.id)
      return res.status(200).send(decoded.id);
    }catch(err){
      return res.status(401).send("Invalid Token");

    }   
}
module.exports.verify=async(req,res)=>{
  if (req.params.type==="user")
  {
    const user = await User.findById(req.params.id);
    user.verified = true;
    await User.findOneAndUpdate({_id:req.params.id},user);
    return res.redirect("http://localhost:3000/login")
  }
  else
  {
    const user = await Theater.findById(req.params.id);
    user.verified = true;
    await Theater.findOneAndUpdate({_id:req.params.id},user);
    return res.redirect("http://localhost:3000/login")
  }
}

module.exports.google_user_login = async (req,res)=>
{
    const {username,email,googleId} = req.body;
    queryObject = await User.find({email:email});
    if (queryObject.length != 0)
    {
        const token=createToken(queryObject[0]._id);
        res.status(201).send(token);
    }
    else
    {
        try{
          var password=googleId;
            const user=await User.create({email,password,username});
            const token=createToken(user._id);
            res.status(201).send(token);
        }catch(err){
            const errors=handleErrors(err);
            res.status(400).json({errors});
        }
    }
  }
 
  module.exports.google_theatre_login = async (req,res)=>
  {
      const {username,email,password,city} = req.body;
      queryObject = await Theater.find({email:email});
      if (queryObject.length != 0)
      {
          const token=createToken(queryObject[0]._id);
          res.status(201).send(token);
      }
      else
      {
          try{
              console.log(city)
              const theatre=await Theater.create({email,password,username,city});
              theatre.verified = true;
              const token=createToken(theatre._id);
              res.status(201).send(token);
          }catch(err){
              const errors=handleErrors(err);
              res.status(400).json({errors});
          }
      }
  }
  
  