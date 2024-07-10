const express = require("express");
const logger = require("morgan");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.use("/", express.static(__dirname + "/html"));
app.get("/list", (req, res) => {
  let list = "<h2>파일 리스트</h2>";
  fs.readdir(__dirname + "/html", "utf-8", (err, data) => {
    for (let i = 0; i < data.length; i++) {
      list += "<br><a href=" + data[i] + ">" + data[i] + "</a>";
    }
    res.send(list);
  });
});

app.listen(port, () => {
  console.log(`${port} 포트에서 동작 중입니다.`);
});
