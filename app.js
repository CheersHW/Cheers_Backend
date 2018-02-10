var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var RandomString = require('randomstring')
var fs = require('fs')
var app = express()
var cheerio = require('cheerio')
var request = require('request')
var Crypto = require('crypto')
var db = require('./database')

app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(morgan('dev'))

app.listen(3000, ()=>{
    console.log('Server Running At 3000 Port!')
})

require('./routes/index')(app, db, request, cheerio)
require('./routes/auth')(app, db, request, Crypto, RandomString)