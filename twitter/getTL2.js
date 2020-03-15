const twitter = require("twitter");
const fs = require("fs");

const client = new twitter(JSON.parse(fs.readFileSync("secret.json", "utf-8")));

const params = { count: 100 };

let idHistory = [];

function loop() {
    client.get('statuses/home_timeline', params, function(error, tweets, response) {
        if (!error) {
            const hashTag = '#豆腐茶番';
            for (let i = 0; i < 50; i++) {
                let tweetText = tweets[i].text;
                let tweetId = tweets[i].id;
                if (idHistory.indexOf(tweetId) == -1) {
                    console.log(tweetText + "\n--------------------");
                    idHistory.push(tweetId);
                }
            }
        } else {
            console.log("Error!");
        }
    });
}
loop();
setInterval(loop, 60 * 1000);