const express = require("express");
const path = require("path"); //경로모듈
const logger = require("morgan");

const app = express();
const port = 3000;
const _path = path.join(__dirname, "/dist");
console.log(__dirname);
console.log(__dirname + "/dist");
console.log(_path);

app.get("/", (req, res) => {
  res.send("<h1>홈페이지입니다.</h1><h2><a href=/story>이똥</a></h2>");
});

app.get("/story", (req, res) => {
  const arr = [
    "My life is pretty",
    "Egg is Life",
    "Cute & I do not have cat",
    "Avengers are Dead",
    "kkkkkkkkkkkkkk",
  ];
  let list = `<h1>링크를 선택하세요</h1><h2><ul>`;
  const tiltle = ["Pretty", "Egg", "Dog", "Avenger", "kkkk"];
  tiltle.forEach(
    (v, i) => (list += `<li><a href="/story?id=${i}">${v}</a></li>`)
  );
  list += `</ul></h2><h2>${arr[req.query.id] ?? "선택하세요"}</h2>`;
  res.send(list);
});

app.listen(port, () => {
  console.log(`${port} 서버가 동작하였습니다.`);
});
