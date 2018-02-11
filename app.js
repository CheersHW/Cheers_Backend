var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var multer = require('multer')
var RandomString = require('randomstring')
var fs = require('fs')
var Youtube = require('youtube-search');
var app = express()
var cheerio = require('cheerio')
var request = require('request')
var Crypto = require('crypto')
var db = require('./database')

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(morgan('dev'))

app.use('/sound',express.static('sound'))
app.use('/comment', express.static('comment'))

app.listen(3000, ()=>{
    console.log('Server Running At 3000 Port!')
})

require('./routes/index')(app, db, request, cheerio, Youtube)
require('./routes/auth')(app, db, request, Crypto, RandomString)
require('./routes/aid')(app, db, multer, RandomString)
require('./routes/comment')(app, db, RandomString)
