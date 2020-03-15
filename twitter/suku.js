const req = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

let hashTemp = '%23%E8%B1%86%E8%85%90%E8%8C%B6%E7%95%AA%E4%BD%93%E8%82%B2%E7%A5%AD';

var options = {
    url: 'https://twitter.com/search?q=NHK&src=typed_query&f=live',
    method: 'GET'
}

function getTweet() {
    req(options, function(error, response, body) {
        let $ = cheerio.load(body);
        fs.appendFileSync("hometimeline.json", body + "\n", "utf-8");
        $('.tweet-text').each(function() {
            console.log($(this).text());
        });
    });
}

getTweet();
setInterval(getTweet, 5000);