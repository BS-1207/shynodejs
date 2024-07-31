const dotenv = require("dotenv");
const express = require("express");
const request = require("request");
const logger = require("morgan");
const app = express();
const port = 3000;
const url = `https://smartcity.gimhae.go.kr/smart_tour/dashboard/api/publicData/dustSensor`;

dotenv.config();

app.use(logger());

app.get("/", (req, res) => {
  const url =
    "http://smartcity.gimhae.go.kr/smart_tour/dashboard/api/publicData/dustSensor"; // 데이터를 가져올 URL

  request(url, (error, response, body) => {
    if (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
      return;
    }

    try {
      const results = JSON.parse(body);

      // 각 결과를 map을 사용해 콘솔에 출력
      results.map((result) => {
        console.log({
          jdev_id: result.jdev_id,
          jname: result.jname,
          jloc: result.jloc,
          jcoordx: result.jcoordx,
          jcoordy: result.jcoordy,
          ison: result.ison,
          pm10_after: result.pm10_after,
          pm25_after: result.pm25_after,
          state: result.state,
          timestamp: result.timestamp,
          company_id: result.company_id,
          company_name: result.company_name,
        });
        return null; // map은 새로운 배열을 반환하기 때문에, 여기서 null을 반환하여 새로운 배열을 생성하지 않도록 함
      });

      res.send("Data fetched and logged to console");
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      res.status(500).send("Error parsing JSON");
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:3000 으로 서비스 되고 있습니다.`);
});
