const dotenv = require("dotenv");
const express = require("express");
const request = require("request");
const logger = require("morgan");
const app = express();
const port = 3000;
const ori = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?`;

dotenv.config();

app.use(logger());

const auth = process.env.APIAUTH;
const query = `authkey=${auth}&data=AP01`;
const url = ori + query;

let dollor = "";

request(url, (e, res, body) => {
  const result = JSON.parse(body);
  //console.log(res);
  const check = result.length - 1;
  const dollor = result[check];
  console.log(dollor);

  //dollor = result[last];
});
//const url = process.env.API;

app.get("/", (req, res) => {
  const drate = parseFloat(dollor.deal_bas_r);
  const hd = drate * 100;
  console.log(hd, typeof hd);
  res.send(`<!DOCTYPE html>
            <html lang="ko">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <style>
                  table {
                    border: 1px solid black;
                    border-collapse: collapse;
                  }
                  th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                  }
                </style>
              </head>
              <body>
                <table>
                  <tr><th>환단위</th><th>환이름</th><th>환율</th><th>100달러당</th></tr>
                  <tr><td>${dollor.cur_unit}</td><td>${dollor.cur_nm}</td><td>${dollor.deal_bas_r}</td><td>${hd}</td></tr>
                </table>
              </body>
            </html>
`);
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:3000 으로 서비스 되고 있습니다.`);
});
