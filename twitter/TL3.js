const fs = require("fs");
let Twitter = require('twitter');

const client = new Twitter(JSON.parse(fs.readFileSync("secret.json", "utf-8")));


const main = async() => {
    const stream = await client.stream('statuses/filter', { 'track': '#ダイエット' });
    stream.on('data', async data => {
        try {
            fs.appendFile("tweet/tweet.csv", JSON.stringify(data) + "\n", (err) => {
                if (err) throw err;
                console.log("正常に書き込みが完了しました");
            });

        } catch (error) {
            console.log(error);
        }
    });
};

main();