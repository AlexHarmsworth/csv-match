const csv = require("csv-parser");
const fs = require("fs");
const strings = [];
const subStrings = [];

const toCsv = (data) => {
  const header = Object.keys(data[0]).join(",");
  const values = data.map((item) => Object.values(item).join(","));
  const csv = [header, ...values].join("\n");
  return csv;
};

const matchPairs = (subStringArr, stringArr) => {
  return subStringArr.map((substr, index) => {
    const string = stringArr.find((str) => str.includes(substr));
    console.log(`Matched "${substr}" to "${string}"`);
    return {
      ID: index,
      string,
      substr,
    };
  });
};

fs.createReadStream(__dirname + "/input/data.csv")
  .pipe(csv(["string", "substring"]))
  .on("data", ({ string, substring }) => {
    if (string) {
      strings.push(string);
    }

    if (substring) {
      subStrings.push(substring);
    }
  })
  .on("end", () => {
    const matched = matchPairs(subStrings, strings);
    fs.writeFileSync("./output/data.csv", toCsv(matched));
  });
