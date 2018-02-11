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
    region : {type : Number},
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

var Comment_Schema = new Schema({
    comment_token : {type : String},
    author_name : {type : String},
    author_token : {type : String},
    text : {type : String},
    video : {type : String}
})

var Rank_Schema = new Schema({
    country : {type : String},
    gold : {type : Number},
    silver : {type : Number},
    bronze : {type : Number},
    rank : {type : Number}
})

var User = mongoose.model('user', User_Schema)
var Sound = mongoose.model('sound', Sound_Schema)
var Comment = mongoose.model('comment', Comment_Schema)
var Rank = mongoose.model('rank', Rank_Schema)

exports.db = db
exports.User = User
exports.Sound = Sound
exports.Comment = Comment
exports.Rank = Rank