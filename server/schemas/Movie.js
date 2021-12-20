const mongoose = require('mongoose');
const movie = new mongoose.Schema({
    movie_id:{
        type:Number
    },
    slots:{
        type:[Number]
    },
    prices:
    {
        type:[Number]
    },
    language:
    {
        type:String
    }

});
module.exports=movie;