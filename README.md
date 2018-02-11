# Cheers
* Cheers Backend Server

* 요청은 GET, POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 http://soylatte.kr:3000 입니다.

## Server Code
### 200

    Success Processing Request

### 400

    Bad Request

### 401

    Unauthorized (Login Error)

### 403

    Forbidden -> 권한 오류

### 404

    URL Not Founded

### 409

    Conflict -> 데이터 충돌 (회원가입시 아이디 중복 등)

### 500

    Server Error


## API DOCUMENT

* Region Data
> 한국 1
> 미국 2
> 일본 3

* 종목
>알파인 스키 1
바이애슬론 2
봅슬레이 3
크로스컨트리 스키 4
컬링 5
피겨 스케이팅 6
프리스타일 스키 7
아이스 하키 8
루지 9
노르딕 복합 10
쇼트트랙 스피드 스케이팅 11
스켈레톤 12
스키점프 13
스노보드 14
스피드 스케이팅 15

### Index
#### /ranking (랭킹확인) GET
>Requiring Params

    No Params

>Return Values
>>Success

    HTTP : 200, JSONArray

#### /youtube (유투브 실시간 확인) GET
>Requiring Params

    No Params

>Return Values
>>Success

    HTTP : 200, VideoID

#### /news (평창뉴스 웹파싱) GET
>Requiring Params

    No Params

>Return Values
>>Success

    HTTP : 200, JSONArray

### Auth

#### /auth/login (로그인)
>Requiring Params

    email, password

>Return Values
>>Success

    HTTP : 200, JSONObject

>>Data Incorrect

    HTTP : 401

>>Not Founded

    HTTP : 401
    
#### /auth/register (회원가입)
>Requiring Params

    username, email, password, pe(좋아하는 스포츠), region(출신지)
    
>Return Values
>>Success

    HTTP : 200, JSONObject 
    
>>Already In Database

    HTTP : 409, {success:false, message:"Already In Database"}
    
#### /auth/edituser (회원정보수정)
>Requiring Params

    username, email(수정불가), password, pe, region
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 401, {success:false, message:"데이터를 찾을수 없음"}

#### /auth/auto (토큰자동로그인)
>Requiring Params

    user_token

>Return Values
>>Success

    HTTP : 200, JSONObject

>>Not Founded

    HTTP : 401, {success:false, message:"로그인 실패"}

### Aid
#### /aid/upload (새 응원구호 작성)
>Requiring Params

    file, region, title, user_token, username, text

>Return Values
>>Success

    HTTP : 200, {success:true, message:"업로드성공"}

#### /aid/like (좋아요)
>Requiring Params

    sound_token, user_token

>Return Values
>>Success

    HTTP : 200, {success:true, message:"업데이트성공"}

#### /aid/dislike (좋아요취소)
>Requiring Params

    sound_token, user_token

>Return Values
>>Success

    HTTP : 200, {success:true, message:"업데이트 성공"}

#### /aid/list (지역별 응원구호 리스트)
>Requiring Params

    region

>Return Values
>>Success

    HTTP : 200, JSONArray

#### /aid/rank (응원 랭킹)
>Requiring Params

    No Params

>Return Values
>>Success

    HTTP : 200, JSONArray
    
## Schema
### User_Schema

    username : {type : String},
    email : {type : String},
    password : {type : String},
    region : {type : Number},
    pe : {type : Number},
    user_token : {type : String}

### Sound_Schema

    region : {type : Number},
    title : {type : String},
    author_token : {type : String},
    author_name : {type : String},
    path : {type : String},
    text : {type : String},
    like : {type : Number},
    like_user : {type : Array},
    sound_token : {type : String}