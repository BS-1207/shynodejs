const dotenv = require("dotenv");
dotenv.config();
const nid = process.env.NAPIID;
const npw = process.env.NAPISECRET;

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const request = require("request");
  const query = req.query?.oriurl;
  const url = `https://openapi.naver.com/v1/util/shorturl`;
  const option = {
    url,
    form: { url: query },
    headers: {
      "X-Naver-Client-Id": nid,
      "X-Naver-Client-Secret": npw,
    },
  };
  request.post(option, (err, x, body) => {
    const data = JSON.parse(body);
    console.log(data.result?.url); // 옵셔널체이닝.이게뭐지?
    const result = data.result?.url ? data.result.url : "";
    res.send(`
      <!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title></head><body>
    <h1>짧은주소 변환 사이트</h1>
    <form action="/">
        <label for="oriurl"></label>
        <input type="text" id="oriurl" name="oriurl">
        <input type="submit" value="전송">
    </form>

    <h2>${result}</h2>
    
    </body></html>`);
  });
});

app.listen(port, () => {
  console.log(`서버가동 http://localhost:${port}`);
});
