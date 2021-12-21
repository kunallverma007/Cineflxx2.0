const mongoose=require('mongoose');
const Booking = new mongoose.Schema({

    movie_id:{
      type:Number,
      required:true
    },
    theater:{
      type:String,
      required:true
    },
    user:{
        type:String,
        required:true
    },
    language:{
      type:String,
      required:true
    },
    slot:{
  
      type:Number,
      required:true
    },
  
    payment:{
      type:Boolean,
      default:false
    },
    pack:{ 
      type:Number,
      required:true
    },
    Date:{
      type:Date,
      default:Date.now()
    }
  })

  module.exports=mongoose.model('Booking',Booking);