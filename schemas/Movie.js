const mongoose = require('mongoose');
const movie = new mongoose.Schema({
    movie_id:{
        type:Number
    },
    slots:{
        type:[String]
    },
    prices:
    {
        type:[Number]
    },

    date_from:
    {

        type:Date
    },
    
    language:
    {
        type:String
    },
    date_to:
    {

        type:Date
    },
});
module.exports=movie;