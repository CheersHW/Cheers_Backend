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

### Index
#### /ranking (랭킹확인) GET
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
    
#### /auth/regiser (회원가입)
>Requiring Params

    username, email, password, pe(좋아하는 스포츠), from(출신지)
    
>Return Values
>>Success

    HTTP : 200, JSONObject 
    
>>Already In Database

    HTTP : 409, {success:false, message:"Already In Database"}
    
#### /auth/edituser (회원정보수정)
>Requiring Params

    username, email(수정불가), password, pe, from
    
>Return Values
>>Success
    
    HTTP : 200, JSONObject
    
>>Not Founded

    HTTP : 401, {success:false, message:"데이터를 찾을수 없음"}

#### /auth/auto (토큰자동로그인)
>Requiring Params

    token

>Return Values
>>Success

    HTTP : 200, JSONObject

>>Not Founded

    HTTP : 401, {success:false, message:"로그인 실패"}
    
## Schema
### User_Schema

    username : {type : String},
    email : {type : String},
    password : {type : String},
    from : {type : Number},
    pe : {type : Number},
    token : {type : String}