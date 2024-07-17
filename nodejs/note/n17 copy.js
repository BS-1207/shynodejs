const express = require("express");
const logger = require("morgan");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
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
  list += ``;
  list += `        td:first-of-type {`;
  list += `            width: 30px;`;
  list += `            background-color: lightblue;`;
  list += `            font-weight: bold;`;
  list += `        }`;
  list += ``;
  list += `        h2 {`;
  list += `            text-align: center;`;
  list += `        }`;
  list += ``;
  list += `        th {`;
  list += `            background-color: lightblue;`;
  list += `        }`;
  list += `    </style>`;
  list += `</head>`;
  list += ``;
  list += `<body>`;
  list += `    <h2>구구단</h2>`;
  list += `    <form action="/dan">`;
  list += `    <select name="gugu">`;
  for (let i = 2; i < 10; i++) {
    list += `        <option value="${i}">${i}단</option>`;
  }
  list += `     </select>`;
  list += `    <input type="submit" value="확인" />`;
  list += `    </form>`;
  list += `    <table>`;
  list += `        <tr>`;
  list += `            <th class="c">X</th>`;
  for (let i = 2; i < 10; i++) {
    list += `            <th>${i}단</th>`;
  }
  list += `        </tr>`;
  list += `        <tr>`;
  for (let i = 1; i < 10; i++) {
    list += `        <td>${i}</td>`;
    for (let j = 2; j < 10; j++) {
      list += `        <td>${j} X ${i} = ${j * i}</td>`;
    }
    list += `        </tr>`;
  }
  list += `    </table>`;
  list += `</body>`;
  list += `</html>`;
  res.send(list);
});

app.get("/dan", (req, res) => {
  const dan = req.query.gugu;
  console.log(dan);
  let list2 = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
  list2 += `    <title>구구단</title>`;
  list2 += `    <style>`;
  list2 += `        table {`;
  list2 += `            border-collapse: collapse;`;
  list2 += `            text-align: center;`;
  list2 += `            width: 150px;`;
  list2 += `            margin: auto;`;
  list2 += `        }`;
  list2 += ``;
  list2 += `        th,`;
  list2 += `        tr,`;
  list2 += `        td {`;
  list2 += `            border: 1px solid #ccc;`;
  list2 += `        }`;
  list2 += ``;
  list2 += `        td:first-of-type {`;
  list2 += `            width: 20px;`;
  list2 += `            background-color: lightblue;`;
  list2 += `            font-weight: bold;`;
  list2 += `        }`;
  list2 += ``;
  list2 += `        h2 {`;
  list2 += `            text-align: center;`;
  list2 += `        }`;
  list2 += ``;
  list2 += `        th {`;
  list2 += `            background-color: lightblue;`;
  list2 += `        }`;
  list2 += `    </style>`;
  list2 += `</head>`;
  list2 += ``;
  list2 += `<body>`;
  list2 += ` <h2>${dan}단</h2>`;
  list2 += ` <table><tr><th></th><th>${dan}단</th><tr>`;
  for (i = 1; i < 10; i++) {
    list2 += ` <tr><td>${i}</td><td>${dan} X ${i} = ${dan * i}</td></tr>`;
  }
  list2 += `<button type="button" onclick="location.href='/' ">구구단표로</button>`;
  list2 += ` </table>`;
  list2 += `</body>`;
  list2 += `</html>`;
  res.send(list2);
});

app.listen(port, () => {
  console.log(`${port} 서버가 동작하였습니다.`);
});
