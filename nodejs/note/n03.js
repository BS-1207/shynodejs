const http = require("http"); //http모듈을 호출하여 http이름으로 사용 파일을 import
const port = 3030;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/plain; charset=utf-8");
  const obj = { 이름: "홍길동", age: 23 };
  console.log(1, obj);
  console.log(2, JSON.stringify(obj)); //JSON.stringify - Object를 JSON 형태로 변환
  //<->JSON.parse() 메서드는 JSON 문자열의 구문을 분석하고,
  // 그 결과에서 JavaScript 값이나 객체를 생성합니다.
  // 선택적으로, reviver 함수를 인수로 전달할 경우,
  // 결과를 반환하기 전에 변형할 수 있습니다.
  res.end(JSON.stringify(obj));
});

// server.listen(port, function(){
server.listen(port, () => {
  console.log(`${port} 포트에서 서버가 가동됨 ${port - 30}포트가 아님.`);
  // 백팅을 사용 : 템프릿문자열, 템플릿리터럴
});
//` 백틱
