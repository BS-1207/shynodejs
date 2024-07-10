const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("어서오세요 express로 작동하는 서버입니다.");
});

app.get("/doc", (req, res) => {
  res.send("문서를 보관하고 있는 곳입니다.");
});

app.get("/etc", (req, res) => {
  res.send("잡동사니를 보관하고 있는 곳입니다.");
});

app.listen(port, () => {
  console.log(`${port} 성공적으로 서버가 시작하였습니다.`);
});
