const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

const port = 3000;
const _path = path.join(__dirname + "/html");

app.use(logger("tiny"));
app.use("/", express.static(_path));

app.get("/data", (req, res) => {
  const title = req.query.title;
  const content = req.query.content;
  console.log("제목 : " + title + "\t내용 : " + content);
  fs.writeFile(`${_path}/${title}.txt`, content, (e) => {
    if (e) console.log(e); //에러 발생시 에러 내용 출력
    console.log(`${title}.txt 이 파일 생성되었습니다.`);
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`${port} 포트에서 서비스 기동 중입니다.`);
});
