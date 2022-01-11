const mongoose = require('mongoose');
const Movie = new mongoose.Schema({
    movie_id:{
        type:Number,
        

        required:true
    },
    theater_id:{
        type:String,
        required:true
    },
    slots:{
        type:[String]
    },
    prices:
    {
        type:[Number]
    },

    from:
    {

        type:Date
    },
    
    language:
    {
        type:String
    },
    to:
    {

        type:Date
    },
});
Movie.statics.findByMovieId = function (movie_id){
    return this.find({ movie_id:movie_id});
}
Movie.statics.findByPkey= function (movie_id,language,theater_id){
    return this.findOne({ movie_id:movie_id,language:language,theater_id:theater_id});
}
Movie.statics.findByPkeyAll= function (movie_id,language,theater_id){
    return this.find({ movie_id:movie_id,language:language,theater_id:theater_id});
}

Movie.pre('save',function(next){
    if (this.to.toISOString().slice(0,10)<this.from.toISOString().slice(0,10)){
        throw new Error('to date cant be less the from date');
    }
    else{

       
        next()
    }
})
module.exports=mongoose.model('Movie',Movie);