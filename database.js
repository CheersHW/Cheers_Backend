var mongoose = require('mongoose')
var Schema = mongoose.Schema
var DATABASE_NAME = "HIGHTHON"
var db = mongoose.connect("mongodb://localhost/"+DATABASE_NAME,(err)=>{
    if(err){
        console.log('DB Error')
        throw err
    }
    else {
        console.log('DB Connect Success! => '+DATABASE_NAME)
    }
})

var User_Schema = new Schema({
    username : {type : String},
    email : {type : String},
    password : {type : String},
    from : {type : Number},
    pe : {type : Number},
    user_token : {type : String}
})

var Sound_Schema = new Schema({
    region : {type : Number},
    title : {type : String},
    author_token : {type : String},
    author_name : {type : String},
    path : {type : String},
    text : {type : String},
    like : {type : Number},
    like_user : {type : Array},
    sound_token : {type : String}
})

var User = mongoose.model('user', User_Schema)
var Sound = mongoose.model('sound', Sound_Schema)

exports.db = db
exports.User = User
exports.Sound = Sound