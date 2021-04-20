/**
 * # 서버 측 JS - 웹앱 제작 1 : 오리엔테이션
 * # 서버 측 JS - 웹앱 제작 2 : 라우팅
 * # 서버 측 JS - 웹앱 제작 3 : 본문 저장
 * # 서버 측 JS - 웹앱 제작 4 : 글 목록 만들기
 * # 서버 측 JS - 웹앱 제작 5 : 본문 읽기
 * # 서버 측 JS - 웹앱 제작 6 : 코드의 개선
 */

// express 모듈을 사용하기 위한 동작 방법
var express = require('express');
var app = express();
// file system 모듈 사용을 위한 선언
var fs = require('fs');
// 사장된 body-parser 역할을 대신 수행 -> 아래 코드를 입력해야 post 함수 내에서 body 함수로 값을 받아올 수 있다.
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-

// 코드 예쁘게(근데 난 이거 없어도 예쁘게 잘 나옴)
app.locals.pretty = true;

// 템플릿 엔진 설정
app.set('views', './views_file'); // 해당 디렉토리에 템플릿 파일 넣을 것임을 표시
app.set('view engine', 'pug'); // pug 템플릿 엔진 사용 선언


app.get('/topic/new', function(req, res){
     // 파일명 읽어오기
     fs.readdir('data', function(err, files){ // files --> 여기서는 해당 디렉토리의 파일명들!(공식문서에서 확인 가능)
        // 파일명 읽기 실패한 경우
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new',{topics: files});
     }); 
});


// form에서 입력받은 값을 파일로 저장하면서 topic으로 돌아옴
app.post('/topic', function(req, res){

    var title = req.body.title;
    var description = req.body.description;

    // 파일 생성 -> error가 발생한 경우의 콜백함수 작성 필요
    fs.writeFile('data/'+title, description, function(err){
        if(err){ // 디렉토리가 잘못 입력되었다거나,,,
            console.log(err);
            res.status(500).send('Internal Server Error'); // 에러가 발생함을 전달
        } else { // 에러가 발생하지 않은 경우
            //res.send(`${title}, ${description} --> Success!`);
            //res.redirect('/topic'); // 작성 후 원 페이지로 redirect
            res.redirect(`/topic/${title}`); // 작성 후 원 페이지로 redirect
        }
    });
});

// 데이터 출력 -> 글 목록 및 내용을 화면 출력
app.get(['/topic', '/topic/:id'], function(req,res){

    // 파일명 읽어오기
    fs.readdir('data', function(err, files){ // files --> 여기서는 해당 디렉토리의 파일명들!(공식문서에서 확인 가능)
        // 파일명 읽기 실패한 경우
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        
        }
        // 파일명 읽기 성공한 경우
        var id = req.params.id;
        console.log(typeof(id)); // id가 없는 경우 undefined
        if(id){
            // 파일명 읽어오기 -> 입력받은 id값과 일치하는 파일명 제몽 굵게 하단에 표시
            fs.readFile('data/'+id, 'utf-8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {title:id, topics:files, description: data});
            });
        } else {
            // id값이 없는 경우
            res.render('view', {topics : files, title:'WELCOME', description: 'Hello, Javascript for Server'}); // view.pug에 data 경로에 있는 파일 이름 배열을 전달
        }        
    });
});

/*
// 제목이 일치하는 파일의 본문 읽기
app.get('/topic/:id', function(req, res){
    var id = req.params.id;

    // 파일명 읽어오기 -> 입력받은 id값과 일치하는 파일명 제몽 굵게 하단에 표시
    fs.readdir('data', function(err, files){ // files --> 여기서는 해당 디렉토리의 파일명들!(공식문서에서 확인 가능)
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            fs.readFile(`data/${id}`, 'utf-8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view', {title:id, topics:files, description: data});
                }
            });
        }
    });
});
*/

// 포트 연결되면 실행될 함수
app.listen(3000, function(){
    console.log('Connected, 3000 port');
});