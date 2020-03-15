const fs = require("fs");
const obj = JSON.parse(fs.readFileSync("hometimeline.json", "utf-8"));

const hashTag = '#気が向いたらリプで来たセリフを言う';

for (let i = 0; i < 50; i++) {
    let tweetText = obj[i].text;
    if (tweetText.match(hashTag)) {
        console.log(obj[i].text + "\n--------------------");
    }
}