module.exports = aid

function aid(app, db, multer, RandomString, request, cheerio){

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

    app.post('/aid/rank', (req, res)=>{
        var GetTokenOptions = {
            method: 'GET',
            url: "http://sports.news.naver.com/pc2018/medal/index.nhn?sortType=goldRanking",
            headers: {
                'cache-control': 'no-cache',
                'user-agent': 'node.js'
            }
        };

        request(GetTokenOptions, function (error, response, body) {
            if (error) throw error;

            var $ = cheerio.load(body);

            var medalArray = new Array()
            var medal = $('span.medal_num')
            medal.each(function (i, elem) {
                medalArray[i] = $(this).text();
            });
            var array = new Array()
            var temp = new Array()
            for (var i = 0; i < medalArray.length; i++) {
                if (i % 4 == 0 && i != 0) {
                    array.push(temp)
                    temp = new Array()
                }
                temp.push(medalArray[i])
            }

            var country = $('span.country_name')
            var countryArray = new Array()
            country.each(function (i, elem) {
                countryArray[i] = $(this).text();
            });

            var result = new Array();

            for (var i=0;i<array.length;i++){
                for (var j=0;j<4;j++){
                    array[i][j] = 0;
                }
            }

            console.log(array)

            for (var i=0;i<array.length;i++){
                result.push({country : countryArray[i], gold : array[i][0], silver : array[i][1], bronze : array[i][2], rank : i+1})
            }
            res.send(result)
        });
    })

}