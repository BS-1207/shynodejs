const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let list = ``;
  list += `    <!DOCTYPE html>`;
  list += `<html lang="ko">`;
  list += `<head>`;
  list += `    <meta charset="UTF-8">`;
  list += `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  list += `    <title>구구단</title>`;
  list += `    <style>`;
  list += `        table {`;
  list += `            border-collapse: collapse;`;
  list += `            text-align: center;`;
  list += `            width: 45%;`;
  list += `            margin: auto;`;
  list += `        }`;
  list += ``;
  list += `        th,`;
  list += `        tr,`;
  list += `        td {`;
  list += `            border: 1px solid #ccc;`;
  list += `        }`;
  list += `        h2 {`;
  list += `            text-align: center;`;
  list += `        }`;
  list += ``;
  list += `        th {`;
  list += `            background-color: lightblue;`;
  list += `        }`;
  list += `        th:first-of-type {`;
  list += `            width: 30px;`;
  list += `            font-weight: bold;`;
  list += `        }`;
  list += `    </style>`;
  list += `</head>`;
  list += `<body><h1>구구단</h1>
            <form action="/">
                <select name="gugu">
                    <option value="0">전체</option>`;
  for (let i = 2; i <= 9; i++) {
    list += `         <option value="${i}">${i}단</option>`;
  }
  list += ` </select><input type="submit" value="확인"></form>`;
  list += `<table><tr>`;

  const gugu = req.query.gugu;
  if (!gugu || gugu == 0) {
    list += `<th></th>`;
    for (let k = 2; k <= 9; k++) {
      list += `<th>${k}단</th>`;
    }
    list += `</tr>`;

    for (let j = 1; j <= 9; j++) {
      list += `<tr><th>${j}</th>`;
      for (let i = 2; i <= 9; i++) {
        list += `<td>${i} x ${j} = ${i * j}</td>`;
      }
      list += `</tr>`;
    }
  } else {
    list += `<th></th><th>${gugu}단</th></tr>`;
    for (let i = 1; i <= 9; i++) {
      list += `<th>${i}</th><td>${gugu} x ${i} = ${gugu * i}</td></tr>`;
    }
  }

  list += `    </table>`;
  list += `</body>`;
  list += `</html>`;
  res.send(list);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
