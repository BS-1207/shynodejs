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
  list += `        th, tr, td {`;
  list += `            border: 1px solid #ccc;`;
  list += `        }`;
  list += `        td:first-of-type {`;
  list += `            width: 30px;`;
  list += `            background-color: lightblue;`;
  list += `            font-weight: bold;`;
  list += `        }`;
  list += `        h2 {`;
  list += `            text-align: center;`;
  list += `        }`;
  list += `        th {`;
  list += `            background-color: lightblue;`;
  list += `        }`;
  list += `        .highlight {`;
  list += `            background-color: yellow;`;
  list += `        }`;
  list += `    </style>`;
  list += `    <script>`;
  list += `        function showDan() {`;
  list += `            const dan = document.getElementById("gugu").value;`;
  list += `            const rows = document.querySelectorAll("table tr");`;
  list += `            rows.forEach((row, index) => {`;
  list += `                if (index === 0) return;`;
  list += `                const cells = row.querySelectorAll("td");`;
  list += `                cells.forEach((cell, cellIndex) => {`;
  list += `                    if (cellIndex === 0) return;`;
  list += `                    if (cellIndex == dan - 1) {`;
  list += `                        cell.classList.add("highlight");`;
  list += `                    } else {`;
  list += `                        cell.classList.remove("highlight");`;
  list += `                    }`;
  list += `                });`;
  list += `            });`;
  list += `        }`;
  list += `    </script>`;
  list += `</head>`;
  list += `<body>`;
  list += `    <h2>구구단</h2>`;
  list += `    <select id="gugu" onchange="showDan()">`;
  for (let i = 2; i < 10; i++) {
    list += `        <option value="${i}">${i}단</option>`;
  }
  list += `    </select>`;
  list += `    <table>`;
  list += `        <tr>`;
  list += `            <th class="c">X</th>`;
  for (let i = 2; i < 10; i++) {
    list += `            <th>${i}단</th>`;
  }
  list += `        </tr>`;
  for (let i = 1; i < 10; i++) {
    list += `        <tr>`;
    list += `            <td>${i}</td>`;
    for (let j = 2; j < 10; j++) {
      list += `            <td>${j} X ${i} = ${j * i}</td>`;
    }
    list += `        </tr>`;
  }
  list += `    </table>`;
  list += `</body>`;
  list += `</html>`;
  res.send(list);
});

app.listen(port, () => {
  console.log(`${port} 서버가 동작하였습니다.`);
});
