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
    token : {type : String}
})

var User = mongoose.model('user', User_Schema)

exports.db = db
exports.User = User