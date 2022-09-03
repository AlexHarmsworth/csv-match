const csv = require("csv-parser");
const fs = require("fs");
const URLs = [];
const codes = [];

const toCsv = (data) => {
  const header = Object.keys(data[0]).join(",");
  const values = data.map((item) => Object.values(item).join(","));
  const csv = [header, ...values].join("\n");
  return csv;
};

const matchPairs = (codeArr, urlArr) => {
  return codeArr.map((code, index) => {
    const URL = urlArr.find((url) => url.includes(code));
    return {
      ID: index + 1,
      URL,
      Code: code,
    };
  });
};

fs.createReadStream(__dirname + "/db/data.csv")
  .pipe(csv(["url", "code"]))
  .on("data", ({ url, code }) => {
    if (url) {
      URLs.push(url);
    }

    if (code) {
      codes.push(code);
    }
  })
  .on("end", () => {
    const matched = matchPairs(codes, URLs);
    fs.writeFileSync("./dist/data.csv", toCsv(matched));
  });
