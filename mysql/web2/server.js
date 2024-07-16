const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "192.168.0.218",
  user: "cbs",
  port: 3306,
  password: "Notorious82!",
  database: "web2",
});

db.connect((error) => {
  if (error) {
    console.log("접속실패!!");
    return;
  }
  console.log("MySQL Connected!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  console.log("웹에 정상 접속 하였습니다.");
});

app.get("/data", (req, res) => {
  const { id, passwd, name, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, password, name, email) VALUES (?,?,?,?)",
    [id, passwd, name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        `id: ${id}, password : ${passwd}, name: ${name}, dob: ${email}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.get("/my", (req, res) => {
  const { id, passwd, name, email } = req.query;
  db.query(
    "INSERT INTO web2 (id, password, name, email) VALUES (?,?,?,?)",
    [id, passwd, name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect("/");
      console.log(
        `id: ${id}, password : ${passwd}, name: ${name}, dob: ${email}`
      );
      console.log("Data inserted successfully");
    }
  ); // MySQL query here
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
