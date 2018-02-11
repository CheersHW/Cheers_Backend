module.exports = aid

function aid(app, db, multer, RandomString){

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './sound')
        },
        filename: (req, file, cb)=>{
            var size = file.originalname.split('.')
            cb(null, RandomString.generate(10)+'.'+size[size.length-1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/aid/upload', upload.single('file') ,(req, res)=>{
        var body = req.body
        console.log(req.file)
        var upload_sound = new db.Sound({
            region : body.region,
            title : body.title,
            author_token : body.user_token,
            author_name : body.username,
            path : "http://soylatte.kr:3000/"+req.file.path,
            text : body.text,
            like : 0,
            like_user : [],
            sound_token : RandomString.generate(10)
        })
        upload_sound.save((err)=>{
            if(err){
                console.log('/aid/upload soundsave Error')
                throw err
            }
            else{
                res.send(200, {success:true, message:"업로드성공"})
            }
        })
    })

    app.post('/aid/like', (req, res)=>{
        var body = req.body
        db.Sound.findOne({
            sound_token : body.sound_token
        }, (err, data)=>{
            if(err){
                console.log('/aid/like soundfind Error')
                throw err
            }
            else if(data){
                var array = new Array()
                array = data.like_user
                array.push(body.user_token)
                db.Sound.update({
                    sound_token : body.sound_token
                }, {$set:{like : data.like+1, like_user : array}} ,(err)=>{
                    if(err){
                        console.log('/aid/like soundupdate Error')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"업데이트성공"})
                    }
                })                
            }
        })
    })

    app.post('/aid/dislike', (req, res)=>{
        var body = req.body
        db.Sound.findOne({
            sound_token : body.sound_token
        }, (err, data)=>{
            if(err){
                console.log('/aid/dislike soundfind Error')
                throw err
            }
            else if(data){
                var array = new Array()
                array = data.like_user
                for (var i=0;i<array.length;i++){
                    if(array[i] == user_token){
                        array.splice(i, 1)
                    }
                }
                db.Sound.update({
                    sound_token : body.sound_token
                }, {$set:{like : data.like-1, like_user : array}}, (err)=>{
                    if(err){
                        console.log('/aid/dislike soundupdate Error')
                        throw err
                    }
                    else {
                        res.send(200, {success:true, message:"업데이트 성공"})
                    }
                })
            }
        })
    })

    app.post('/aid/list', (req, res)=>{
        var body = req.body
        var query = db.Sound.find({region : body.region}).sort({ "like" : -1})
        query.exec((err, data)=>{
            if(err){
                console.log('/aid/list listfind Error')
                throw err
            }
            else if(data[0]){
                res.send(200, data)
            }
            else{
                res.send(200, [])
            }
        })
    })

}