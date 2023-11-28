const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode:String,
    longUrl:String,
    shortUrl:String,
    create_At:{
        type:String,
        default:Date.now
    },
    expire_at:{
        type:String,
        default:false,
    },
})

module.exports = mongoose.model('Url' , urlSchema);