/////////////////////////////////////////////////////
/* 
    # 서버 측 JS - Express,간단한 웹앱 만들기
    # 서버 측 JS - Express,정적파일을 서비스하는 법
    # 서버 측 JS - Express, 웹페이지를 표현하는 
    # 서버 측 JS - Express, 템플릿 엔진 1 : 소개
*/
/////////////////////////////////////////////////////

/*
 메인 어플리케이션, entry application
  - 파일이 여러개인 애플리케이션인 경우 가장 최초로 실행될, 진입점이 될 애플리케이션
  - app.js: express에서 권장하는 메인 어플리케이션 이름
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.locals.pretty = true;
app.set('view engine', 'pug'); // jade(pug)와 express를 연결하는 코드
app.set('views', './views'); // jade(pug)문법으로 만들어진 파일 디렉토리 설정 코드

/* 템플릿 엔진이 적용된 html을 위한 라우터 */
app.get('/template', function(req, res){

    /*
        res.render()
        - views에 위치한 temp.pug 파일을 가져와서 html로 렌더링
        - 인자
            1) pug 파일명
            2) 해당 pug파일에서 사용할 객체
    */
    res.render('temp', {time: Date(), _title:'JADE==PUG'});  
});

/*
    정적인 파일이 위치할 디렉토리를 지정하는 기능
     - url입력할 때는 http://127.0.0.1:3000/test.jpg
       즉, public 생략하고 작성
    - 사용된 public은 정적 파일이 위치하는 디렉토리명
*/
app.use(express.static('public'));

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/test.jpg">');
});

/*
    form - POST
    ... req.body -> post로 넘어온 데이터 받기!
    ... 단, 여기서는 post를 제대로 받지 못하기 때문에 해당 값을 제대로 받아오고 싶으면 body-parser 사용 필요
    ... body-parser 사라졌다! express req.body 문서 참조해서 적절하게 변경 필요
        app.use(express.json()) // for parsing application/json
        app.use(express.urlencoded({ extended: true })) // for parsing application/x-
*/
app.get('/form', function(req, res){
    res.render('form');
});
app.get('/form_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(`${title}: ${description}`);
});

// body-parser 대신 사용!
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-

app.post('/form_receiver', function(req, res){
    
    var title = req.body.title; // req.body -> post로 넘어온 데이터 받기!
    var description = req.body.description;
    res.send(`With POST!!!!   ${title}: ${description}`);
});

/*
    쿼리 스트링
*/
app.get('/topic', function(req, res){ 
    
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];

    var output = `
        <a href='/topic?id=0'>Javascript</a><br>
        <a href='/topic?id=1'>Nodejs</a><br>
        <a href='/topic?id=2'>Express</a><br>
        <h4>${topics[req.query.id]}</h4>
    `;

    res.send(output);
});

/*
    시멘틱 URL(Semantic URL)
*/
app.get('/topicSemantic/:id', function(req, res){ 
    
    var topics = [
        'Javascript is...',
        'Nodejs is...',
        'Express is...'
    ];

    var output = `
        <a href='/topicSemantic/0'>Javascript</a><br>
        <a href='/topicSemantic/1'>Nodejs</a><br>
        <a href='/topicSemantic/2'>Express</a><br>
        <h4>${topics[req.params.id]}</h4>
    `;

    res.send(output);
});

app.get('/topicSemantic/:id/:mode', function(req, res){ 
    
    res.send(req.params.id +  ',' + req.params.mode);

});


/*
    동적으로 파일을 처리하는 경우, 변경사항 바로 반영X
    서버를 껐다 켜야만 반영된다.
*/
app.get('/dynamic', function(req,res){

    var time = Date();
    var lis = '';
    for(var i = 0; i<5; i++){
        lis += '<li>coding</li>';
    }

    var output = `
    <!DOCTYPE HTML>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
                Hello, Dynamic!
                <ul>
                ${lis}
                </ul>
                ${time}
        </body>
    </html>`;
    res.send(output);   
});

/*
    get() 내부의 func 사용법은 expressjs.com 사용설명서에서 확인
    get(URL, 콜백함수)

    라우터(Router)
     - 요청이 들어왔을 때 길을 찾을 수 있도록 연결!(get이 이 역할을 한다.)
*/
app.get('/', function(req,res){
    res.send('Hello home page');
});

app.get('/login', function(req,res){
    res.send('<h1>Login please</h1>');
});

app.listen(3000, function(){ // 3000 - port
    console.log('Connected 3000 port!')
});

