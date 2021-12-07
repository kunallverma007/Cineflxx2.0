const mongoose=require('mongoose');
const movie=require('./Movie')
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const Theater=new mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        validate:[isEmail,'Please enter valid email']
    },
    username:
    {
        type:String,
        required:true
    },

    password:
    {
        type:String,
        required:true
    },
    verified:
    {
        type:Boolean,
        default:false
    },
    city:
    {
        type:String,
        required:true
    },
    movies:
    {
        
      type:[Object]
    },
    booking:
    {
      type:[String],
      default:[]
    }
});
  // fire a function before doc saved to db
  Theater.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  // static method to login user
  Theater.statics.login = async function(email, password) {
    console.log(email,password);
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
module.exports=mongoose.model('Theater',Theater)