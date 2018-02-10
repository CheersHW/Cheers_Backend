module.exports = auth

function auth(app, db, request, Crypto, RandomString) {

    app.post('/auth/register', (req, res)=>{
        var body = req.body
        db.User.findOne({
            email : body.email
        }, (err, data)=>{
            if(err){
                console.log('/auth/register userfind Error')
                throw err
            }
            else if(data){
                res.send(409, {success : false, message : "Already In Database"})
            }
            else {
                var user_data = new db.User({
                    username : body.username,
                    email : body.email,
                    password : body.password,
                    pe : body.pe,
                    from : body.from,
                    token : RandomString.generate(10)
                })
                
                user_data.save((err)=>{
                    if(err){
                        console.log('/auth/register usersave Error')
                        throw err
                    }
                    else {
                        res.send(200, user_data)
                    }
                })
            }
        })
    })

    app.post('/auth/login', (req, res)=>{
        var body = req.body
        db.User.findOne({
            email : body.email,
            password : body.password
        }, (err, data)=>{
            if(err){
                console.log('/auth/login userfind Error')
                throw err
            }
            else if(data){
                res.send(200, data)
            }
            else {
                res.send(401, {success : false, message : "로그인 실패"})
            }
        })
    })

    app.post('/auth/edituser', (req, res)=>{
        var body = req.body
        db.User.update({
            email : body.email
        }, {$set:{username : body.username, password : body.password, pe : body.pe, from : body.from}}, (err)=>{
            if(err){
                console.log('/auth/edituser userupdate Error')
                throw err
            }
            else {
                db.User.findOne({
                    email : body.email
                }, (err,data)=>{
                    if(err){
                        console.log('/auth/edituser userfind Error')
                        throw err
                    }
                    else if(data){
                        res.send(200, data)
                    }
                    else {
                        res.send(401, {success:false, message:"찾을수 없음"})
                    }
                })
            }
        })
    })

    app.post('/auth/auto', (req, res)=>{
        var body = req.body
        db.User.findOne({
            token : body.token
        }, (err, data)=>{
            if(err){
                console.log('/auth/auto userfind Error')
                throw err
            }
            else if(data){
                res.send(200, data)
            }
            else {
                res.send(401, {success:false, message:"로그인 실패"})
            }
        })
    })

    // app.post('/auth/register', (req, res)=>{
    //     var server_body = req.body
    //     var nonce = Math.floor(100000 + Math.random() * 900000000000)
    //     var timestamp = Math.floor(new Date / 1000)
    //     var param = "application_id=68506&auth_key=2FT4jK6PAu96gcr&nonce="+nonce+"&timestamp="+timestamp
    //     var sign = Crypto.createHmac('sha1', "b5B3GFdCyt6hZbb").update(param).digest('hex')
    //     // console.log(param)
    //     // console.log(sign)
    //     var GetTokenOptions = {
    //         method: 'POST',
    //         url: 'https://api.quickblox.com/session.json',
    //         headers: {
    //             'cache-control': 'no-cache',
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         form: {
    //             application_id: '68506',
    //             auth_key: '2FT4jK6PAu96gcr',
    //             signature: sign,
    //             nonce: nonce,
    //             timestamp: timestamp
    //         }
    //     };
    //
    //     request(GetTokenOptions, (error, response, body)=>{
    //         if (error) throw new Error(error);
    //         var data = JSON.parse(body)
    //         var token = data.session.token
    //         var SignUpOptions = {
    //             method: 'POST',
    //             url: 'https://api.quickblox.com/users.json',
    //             headers: {
    //                 'cache-control': 'no-cache',
    //                 'content-type': 'application/x-www-form-urlencoded',
    //                 'QB-Token' : token
    //             },
    //             form: {
    //                 user : {
    //                     full_name : server_body.username,
    //                     login : server_body.username,
    //                     password : server_body.password,
    //                     email : server_body.email
    //                 }
    //             }
    //         }
    //         request(SignUpOptions, (error, response, body)=>{
    //             if (error){
    //                 throw new Error(error);
    //                 res.send(error)
    //             }
    //             var respp = JSON.parse(body)
    //             console.log(respp)
    //             db.User.findOne({
    //                 username : server_body.username
    //             }, (err, data)=>{
    //                 if(err){
    //                     console.log('/auth/register userfind Error')
    //                     throw err
    //                 }
    //                 else if(data){
    //                     res.send({success : false, message : "Already In Database"})
    //                 }
    //                 else {
    //                     var user_data = new db.User({
    //                         id : respp.user.id,
    //                         owner_id : respp.user.owner_id,
    //                         username : server_body.username,
    //                         email : server_body.email,
    //                         password : server_body.password,
    //                         pe : server_body.pe,
    //                         from : server_body.from
    //                     })
    //                     user_data.save((err)=>{
    //                         if(err){
    //                             console.log('/auth/register usersave Error')
    //                             throw err
    //                         }
    //                         else {
    //                             res.send(respp.user)
    //                         }
    //                     })
    //                 }
    //             })
    //
    //         })
    //
    //     });
    // })
    //
    // app.post('/auth/login', (req, res)=>{
    //     var server_body = req.body
    //     var nonce = Math.floor(100000 + Math.random() * 900000000000)
    //     var timestamp = Math.floor(new Date / 1000)
    //     var param = "application_id=68506&auth_key=2FT4jK6PAu96gcr&nonce="+nonce+"&timestamp="+timestamp
    //     var sign = Crypto.createHmac('sha1', "b5B3GFdCyt6hZbb").update(param).digest('hex')
    //     // console.log(param)
    //     // console.log(sign)
    //     var GetTokenOptions = {
    //         method: 'POST',
    //         url: 'https://api.quickblox.com/session.json',
    //         headers: {
    //             'cache-control': 'no-cache',
    //             'content-type': 'application/x-www-form-urlencoded'
    //         },
    //         form: {
    //             application_id: '68506',
    //             auth_key: '2FT4jK6PAu96gcr',
    //             signature: sign,
    //             nonce: nonce,
    //             timestamp: timestamp
    //         }
    //     };
    //
    //     request(GetTokenOptions, (error, response, body)=>{
    //         if (error) throw new Error(error);
    //         var data = JSON.parse(body)
    //         var token = data.session.token
    //
    //         var options = { method: 'GET',
    //             url: 'https://api.quickblox.com/users/by_login.json',
    //             qs: { login: server_body.username },
    //             headers: {
    //                 'cache-control': 'no-cache',
    //                 'qb-token': token } };
    //
    //         request(options, (error, response, body)=>{
    //             if (error) throw new Error(error);
    //             var data = JSON.parse(body)
    //             res.send(data.user)
    //         });
    //
    //     });
    //
    // })


}

