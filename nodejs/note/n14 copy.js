const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const port = 3000;
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.send("안녕하세요! Express로 만든 서버입니다.");
});

app.use("/list", express.static(__dirname));
app.get("/list", (req, res) => {
  let list = "<h2>파일 리스트</h2>";
  fs.readdir(__dirname, "utf-8", (err, data) => {
    console.log(__dirname);
    fs.stat(__dirname, (err, stats) => {
      if (err) {
        console.error("Error getting file stats:", err);
        return;
      }
      if (stats.isDirectory()) {
        console.log(`디렉토리: ${file}`);
      } else if (stats.isFile()) {
        console.log(`파일: ${file}`);
      }
    });
  });
  data.forEach((v, i) => {
    list += `<br><a href="${v}">${v}</a>`;
  });
  res.send(list);
});

app.listen(3000, () => {
  console.log(`${port} 포트로 서버가 실행 중입니다.`);
});
