import { useContext, useEffect } from "react";
import { Tweet } from "./Tweet";
import { TweetsContext } from "../Contexts/TweetContext";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const TweetsList = () => {
  const { tweets, setTweets } = useContext(TweetsContext);
  const usersCollectionRef = collection(db, "tweets");

  useEffect(() => {
    getTweets();
    const interval = setInterval(() => {
      getTweets();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getTweets = async () => {
    const data = await getDocs(usersCollectionRef);
    const mapedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setTweets(mapedData);
    console.log(mapedData);
  };

  const DateSortedTweets = tweets.sort(
    (tweetA, tweetB) => tweetB.date.seconds - tweetA.date.seconds
  );

  return (
    <div className="TweetsList">
      {DateSortedTweets.map((tweet, index) => {
        let date = new Date(tweet.date.seconds * 1000).toISOString();
        return (
          <>
            <Tweet
              key={index}
              content={tweet.content}
              userName={tweet.username}
              date={date}
            />
          </>
        );
      })}
    </div>
  );
};
