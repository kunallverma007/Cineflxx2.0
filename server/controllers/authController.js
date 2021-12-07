const User= require('../schemas/User');
const Theater=require('../schemas/Theater')
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
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
    try{
        const user=await User.create({email,password,username});
        const token=createToken(user._id);
        res.status(201).send(token);
    }catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }
}
module.exports.signin_user=async (req,res)=>
{
    const {email,password} = req.body;
    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.status(201).send(token);
    }catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }
}
module.exports.signup_theater=async (req,res)=>
{

    const {email,password,username,city} = req.body;
    try{
        const user=await Theater.create({email,password,username,city});
        const token=createToken(user._id);
        res.status(201).json({token});
    }catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }
}
module.exports.signin_theater=async (req,res)=>
{
    const {email,password} = req.body;
    try{
        const user=await Theater.login(email,password);
        const token=createToken(user._id);
        res.status(201).send(token);
    }catch(err){
        const errors=handleErrors(err);
        res.status(400).json({errors})
    }   
}
module.exports.is_correct_user=async (req,res)=>
{
    const {token} = req.body;
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log(decoded);
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