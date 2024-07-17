const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.get("/", (req, res) => {
  const data = "파일 내용이 작성 됨";
  res.send("파일이 저장되었다 이말이야");
  fs.writeFile(__dirname + "/save.txt", data, (e) => {
    if (e) console.log(e); //에러 발생시 에러 내용 출력
    console.log("파일작성이 완료되었습니다.");
  });
});

app.listen(port, () => {
  console.log(`${port} 포트로 서비스 실행 중입니다.`);
});
