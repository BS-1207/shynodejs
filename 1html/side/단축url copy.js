const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");

dotenv.config();

const express = require("express");
const app = express();
const port = 3000;
const request = require("request");

app.use(logger());
app.use(bodyParser.urlencoded({ extends: true }));

const nid = process.env.NAPIID;
const npw = process.env.NAPISECRET;

const url = `https://openapi.naver.com/v1/util/shorturl`;

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <fieldset>
      <form method="post" action="/shorturl">
        <label>긴 URL을 short URL로 변경</label><br>
        <label for="longurl">긴 URL 입력</label
        ><input type="text" name="longurl" id="longurl" style="width=1000px" />
        <button type="submit">변환</button>
      </form>
    </fieldset>
  </body>
</html>
`);
});

function shortUrl(option) {
  return new Promise((resolve, reject) => {
    request.post(option, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

app.post("/shorturl", async (req, res) => {
  const orgUrl = req.body.longurl;
  const option = {
    url,
    form: { url: orgUrl },
    headers: {
      "X-Naver-Client-Id": nid,
      "X-Naver-Client-Secret": npw,
    },
  };

  try {
    const body = await shortUrl(option);
    const test = JSON.parse(body);
    const sUrl = test.result.url;
    console.log(sUrl);

    res.send(`<!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <h2>요청하신 url : ${orgUrl}</h2>
          <h2>short url : ${sUrl}</h2>
        </body>
      </html>`);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("An error occurred");
  }
});
app.listen(port, () => {
  console.log("서버가 http://localhost:3000 에서 실행되고 있습니다.");
});
