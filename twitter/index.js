const twitter = require('ntwitter');
const fs = require("fs");
var server = require("http").createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    var output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);
}).listen(8080);

var io = require("socket.io").listen(server);

const tw = new twitter(JSON.parse(fs.readFileSync("secret.json", "utf-8")));

tw.stream('statuses/filter', { 'track': '#コロナ' }, function(stream) {
    stream.on('data', function(data) {
        console.log(data.created_at);
        console.log(data.user.screen_name);
        console.log(data.text);
        console.log('------------------------');
        fs.appendFileSync("hometimeline.json", JSON.stringify(data) + "\n", "utf-8");
        io.emit('publish', data.text);
    });
});