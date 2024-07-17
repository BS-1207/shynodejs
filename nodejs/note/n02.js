const http = require("http"); //http모듈을 호출하여 http이름으로 사용 파일을 import

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=utf-8");
  res.end("안녕하세요. nodejs 서버입니다.");
});
// server.listen(3000, function(){
server.listen(3000, () => {
  console.log("3000 포트에서 서버가 가동됨");
});
// 지금 현재 구현된 서버는 충돌이 나면 꺼지므로 관리해주는 기능을 추가하여 주어야한다.
