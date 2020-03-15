from twitterscraper import query_tweets
import datetime as dt
import pandas as pd


# input
begin_date = dt.date(2019, 8, 23)
end_date = dt.date(2019, 9, 1)
pool_size = (end_date - begin_date).days

# tweetの収集
tweets = query_tweets("#豆腐茶番体育祭", lang="ja")

tuple_tweet = [(tweet.user_id, tweet.text.replace(
    "\n", "\t"), tweet.timestamp) for tweet in tweets]
# ツイートが重複しているので重複削除する
df = pd.DataFrame(set(tuple_tweet), columns=['user_id', 'tweet', 'post'])

df.sort_values('post').reset_index(drop=True)

print(tuple_tweet)
