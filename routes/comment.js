module.exports = comment

function comment(app, db, Randomstring){

    var storage = multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, './comment')
        },
        filename: (req, file, cb)=>{
            var size = file.originalname.split('.')
            cb(null, RandomString.generate(10)+'.'+size[size.length-1])
        }
    })

    var upload = multer({ storage: storage })

    app.post('/comment/upload', upload.single('file'), (req, res)=>{
        var body = req.body
        var commnet_save = new db.Comment({
            author_token : body.user_token,
            comment_token : Randomstring.generate(10),
            author_name : body.username,
            text : body.text,
            video : "http://soylatte.kr:3000/"+req.file.path
        })
        commnet_save.save((err)=>{
            if(err){
                console.log('/comment/upload commentsave Error')
                throw err
            }
            else {
                res.send(200, {success:true, message:"업로드 성공"})
            }
        })
    })

    app.post('/comment/list', (req, res)=>{
        var body = req.body
        db.Comment.find((err, data)=>{
            if(err){
                console.log('/comment/list commentfind Error')
                throw err
            }
            else if(data[0]){
                res.send(200, data)
            }
            else {
                res.send(200, [])
            }
        })
    })

}