const fs = require("fs");
const twitter = require('ntwitter');
const tw = new twitter(JSON.parse(fs.readFileSync("secret.json", "utf-8")));

tw.stream('statuses/filter', { 'track': '#豆腐茶番体育祭開発部' }, function(stream) {
    stream.on('data', function(data) {
        console.log(data.created_at);
        console.log(data.user.screen_name);
        console.log(data.text);
        console.log('------------------------');
        fs.appendFileSync("hometimeline.json", JSON.stringify(data) + "\n", "utf-8");
    });
});