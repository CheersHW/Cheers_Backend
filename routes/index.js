module.exports = index

function index(app, db, request, cheerio, Youtube) {

    app.get('/', (req, res) => {
        res.send('Hello')
    })

    app.get('/ranking', (req, res) => {
        var url = "https://www.pyeongchang2018.com/ko/game-time/results/OWG2018/ko/general/medal-standings.htm";

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

            console.log(array.length)

            for (var i=0;i<array.length;i++){
                result.push({counrty : countryArray[i], gold : array[i][0], silver : array[i][1], bronze : array[i][2], rank : i+1})
            }
            res.send(result)
        });
    })

    app.get('/youtube', (req, res)=>{
        var options = { method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        qs: 
         { part: 'id',
           key: 'AIzaSyAIkpfsnh7XgMFUkpZYDi3sm97R6dihBA4',
           channelId: 'UCSI2RHJc_CHX5T8a7scmf8A',
           order: 'date',
           type: 'video' },
        headers: 
         { 'postman-token': 'd19d1d63-bd27-38cc-0263-58749a61f293',
           'cache-control': 'no-cache' } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var data = JSON.parse(body)
        res.send(200, data.items[0].id.videoId)
      });
      
    })

}