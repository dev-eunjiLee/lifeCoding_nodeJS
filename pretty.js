/////////////////////////////////////////////////////
/*
    서버 측 JS - 모듈 3 : NPM 독립적인 앱 설치
     - uglify-js 실습(내가 작성한 js 파일을 일부러 못생기게! 가독성없고 줄바꿈없게 변경)
*/
/////////////////////////////////////////////////////

function hello(name){
    console.log('Hi, ' + name);
}

hello('Ethan');

/*
    uglifyjs pretty.js
    출력: function hello(name){console.log("Hi, "+name)}hello("Ethan");
    공백을 제거해서 더 가볍게!

    uglifyjs pretty.js -m ... m(mangle) 짓이기다
    출력: function hello(l){console.log("Hi, "+l)}hello("Ethan");
    이름을 바꿔도 상관없는 변수의 이름을 한글자로 바꿔 더 가볍게!

    uglifyjs pretty.js -o uglified.js -m
    변수 이름까지 축약되어 uglify된 js의 형태로 저장된다.(파일명: uglified.js)
    파일명은 주로 기존 파일명.min(최소화의 의미).js 로 설정한다.
        ex) pretty.min.js
*/