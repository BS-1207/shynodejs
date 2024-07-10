const http = require("http");
const port = 3000;
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");
  const path = "./html/test.html";
  //const path = __dirname + "/index.html";
  fs.readFile(path, (err, data) => {
    if (err) {
      res.end("html 읽을 때 에러가 났어요.");
    } else res.end(data);
  }); //callback - 함수를 매개변수로 넣는다.
});

server.listen(port, () => console.log(`${port}에서 서버가 가동됨`));
