const express = require("express");
const mysql = require("mysql");
const logger = require("morgan");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "192.168.0.218",
  user: "cbs",
  port: 3306, //미입력 기본 포트
  password: "Notorious82!",
  database: "test_db",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!!");
});

app.use(logger());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  db.query("SELECT * FROM web", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    let printlist="";
    console.log(result);
    result.forEach((v) =>{
      printlist =+ v;
      printlist =+ "<br>";
    });
  console.log(`웹에 정상 접속하였습니다.`);
});

app.get("/data", (req, res) => {
  const { name, dob } = req.query;
  db.query(
    "INSERT INTO web (name, dob) VALUES (?,?)",
    [name, dob],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
        res.redirect("/");
      }
      console.log(`name: ${name}, dob : ${dob}`);
      console.log("Data Inserted Successfully!!");
      res.redirect("/");
    }
  );
});

/* app.get("/list", (req, res) => {
  db.query("SELECT * FROM web", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(result);
  });
}); */
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
