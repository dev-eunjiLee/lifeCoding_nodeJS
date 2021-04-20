/////////////////////////////////////////////////////
/*  # 서버 측 JS - 간단한 웹앱 만들기 1 : 실행 */
/*  # 서버 측 JS - 모듈 1 : 기초 */
/////////////////////////////////////////////////////

/*
    require('필요한 부품')
     - node.js에서 모듈을 불러오는 함수
     - 아래 서버를 구동시키기 위해 필요한 모듈(여기서는 http)을 요구한다.
     - 정확히는 modeule.exports를 리턴

    const: 상수 -> 한 번 값이 할당되면 변경 불가
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

/*
    http.creatServer()
     - return: http.server
     - HTTP 요청이 서버에 오면 node가 트랜잭셔능ㄹ 다루기 위해 request, response 객체를 전달한다.
     - 해당 함수의 파라미터로 requestListener() 함수가 화살표함수(java의 람다식)의 형태로 들어간다.
        - requestListener()함수: request를 얻었을 때 어떻게 처리할지에 대해 처리할지에 대해 정의
            - 1번째 파라미터: request
            - 2번째 파라미터: response

     server.listen()
     - HTTP 서버가 요청에 대해 듣기(대기) 시작하게 하는 함수
     - server.listen(port, host, callback)
        - 콜백함수: 어떤 이벤트가 발생했거나, 특정 시점에 도달했을 때 시스템에서 호출하는 함수
        - listen이 끝나면 callback함수가 호출된다.
*/
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});