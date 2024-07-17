const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

const port = 3000;
const _path = path.join(__dirname + "/html");

app.use(logger("tiny"));
app.get("/", (req, res) => {
  res.sendFile(`${_path}/index.html`);
});

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

app.get("/list", (req, res) => {
  fs.readdir(_path, "utf-8", (err, data) => {
    console.log(_path);
    let list = "<h1>파일 리스트</h1>";
    data.forEach((v) => {
      list += `<br><a href="${v}" style="text-decoration:none">${v}</a>   <a href="${v}" download style="text-decoration:none">다운로드</a>`;
    });
    res.send(list);
  });
});
app.use("/list", express.static(_path));

app.listen(port, () => {
  console.log(`${port} 포트에서 서비스 기동 중입니다.`);
});
