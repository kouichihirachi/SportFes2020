const twitter = require('twitter');

const client = new twitter({
    //取得したものを入れてください
    consumer_key: "c035gUqMWGSrxOJ6gep7l4rzD",
    consumer_secret: "T85ahSM2m2fO6DLTseNOgBLzy0IQRQxuG0kFrQecBz90q3bnOb",
    access_token_key: "1120688201952157697-mEuoieIePyRecWjk1OUtMB3yWSBxvD",
    access_token_secret: "NZEufFWRykPmx1AzK8Y46zjBrkwIHDjFHiid4ddUsQvPQ"
});

searchTweet('豆腐茶番体育祭');

function searchTweet(queryArg, nextResultsMaxIdArg = null) {
    client.get('search/tweets', { q: queryArg, count: 100, max_id: nextResultsMaxIdArg }, (error, searchData, response) => {
        for (item in searchData.statuses) {
            let tweet = searchData.statuses[item];
            console.log('@' + tweet.user.screen_name + ' : ' + tweet.text); //実際に使う場合はここでファイルへ書き出しなどといった処理を行うことになると思います
        }

        if (searchData.search_metadata == undefined) {
            console.log('---- Complete (no metadata) ----');
            return 0;
        } else if (searchData.search_metadata.next_results) {
            let maxId = searchData.search_metadata.next_results.match(/\?max_id=(\d*)/);

            if (maxId[1] == null) {
                return 0;
            }

            console.log('---- next:' + maxId[1] + ' ----');
            searchTweet(queryArg, maxId[1]);
        } else {
            console.log('---- Complete ----');
            return 0;
        }
    });
}