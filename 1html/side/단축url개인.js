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

let shortUrl;

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

app.post("/shorturl", (req, res) => {
  const orgUrl = req.body.longurl;

  const option = {
    url,
    form: { url: orgUrl },
    headers: {
      "X-Naver-Client-Id": nid,
      "X-Naver-Client-Secret": npw,
    },
  };
  request.post(option, (err, x, body) => {
    const test = JSON.parse(body);
    const test2 = test.result.url; //const test2=test.result?.url //?. 옵션널 체이닝 값이 없어도 크게 에러 발생 안시킴
    //test.result가 null 또는 undefined인 경우, url 속성에 접근하려고 하면 오류가 발생하지 않고 undefined를 반환합니다.
    //test.result가 유효한 객체인 경우, url 속성 값을 반환합니다.
    console.log(test2);
    shortUrl = test2;
    console.log(shortUrl);
    res.send(`<!DOCTYPE html>
        <html lang="ko">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
          </head>
          <body>
            <table>
                <tr><th><h2>요청하신 url</h2></th><td>${orgUrl}</td></tr>
                <tr><th><h2>short url</h2></th><td>${shortUrl}</td></tr> 
            </table>
          </body>
        </html>`);
  });
  console.log(shortUrl);
});

app.listen(port, () => {
  console.log("서버가 http://localhost:3000 에서 실행되고 있습니다.");
});
