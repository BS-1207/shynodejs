const fs = require("fs");
const path = require("path");

files = fs.readdir(__dirname); // 모든 파일 조회

files.forEach((file) => {
  console.log(file);
  files.forEach((file) => {
    let filePath = path.join(__dirname, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error("Error getting file stats:", err);
        return;
      }
      if (stats.isDirectory()) {
        console.log(`디렉토리: ${file}`);
      } else if (stats.isFile()) {
        console.log(`파일: ${file}`);
      }
    });
  });
  /*statsObj = fs.lstat(file, );
  console.log("Path is file:", statsObj.isFile()); // 파일이면 true
  console.log("Path is directory:", statsObj.isDirectory()); // 폴더면 true*/
});
