const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extends: true }));
app.use(
  session({
    secret: "pw123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e201my.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { id, password } = req.body;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
