/////////////////////////////////////////////////////
/* 
    #  서버 측 JS - express 도입
     - webserver.js 파일의 주석도 참조
*/
/////////////////////////////////////////////////////


const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

/*
    listen()
     - 시간이 오래걸릴 수 있는 작업이기 때문에 다 처리되고 나면 사용할 콜백함수 정의 필요
     - 사용자가 서버로 들어왔을 때 뭘 출력할 것인가는 createServer()에서 정의
    
    createServer()
     - 
*/

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

