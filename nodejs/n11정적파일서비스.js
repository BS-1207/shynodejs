const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.use(logger("tiny"));

app.use("/", express.static(__dirname + "/html"));
//app.use("/", express.static("D:\\BS_Choi\\workspace3\\nodejs\\html"));
//app.use("/main", express.static("D:\\BS_Choi\\workspace3\\nodejs\\"));
app.use("/main", express.static(__dirname));
app.use("/img", express.static("D:\\BS_Choi\\workspace3\\nodejs\\img"));

app.listen(port, () => {
  console.log(`${port} 로 작동되고 있습니다.`);
});
