import { useContext, useEffect } from "react";
import { Tweet } from "./Tweet";
import { TweetsContext } from "../Contexts/TweetContext";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  limit,
  query,
  orderBy,
  startAfter,
  startAt,
} from "firebase/firestore";
import { useState } from "react";
import "../Styles/TweetsList.css";

export const TweetsList = () => {
  const { tweets, setTweets } = useContext(TweetsContext);
  const tweetsCollectionRef = collection(db, "tweets");

  const [tweetLimit, setTweetLimit] = useState(10);
  console.log(tweetLimit);

  const getMoreTweets = () => {
    const tweetsCollectionRef10 = query(
      tweetsCollectionRef,
      orderBy("date", "desc"),
      limit(tweetLimit)
    );

    onSnapshot(tweetsCollectionRef10, (snapshot) => {
      let liveTweets = [];
      snapshot.docs.forEach((doc) => {
        liveTweets.push({ ...doc.data(), id: doc.id });
        setTweets(liveTweets);
        setTweetLimit(tweetLimit + 10);
      });
    });
  };

  useEffect(() => {
    getMoreTweets();
  }, []);

  const handleScroll = (event) => {
    let triggerHeight =
      event.currentTarget.scrollTop + event.currentTarget.offsetHeight;
    if (triggerHeight >= event.currentTarget.scrollHeight) {
      setTimeout(() => {
        getMoreTweets();
      }, 1000);
    }

    console.log("scrollTop: ", event.currentTarget.scrollTop);
    console.log("offsetHeight: ", event.currentTarget.offsetHeight);
    console.log("scrollHeight: ", event.currentTarget.scrollHeight);
  };

  return (
    <div className="TweetsList" onScroll={handleScroll}>
      {tweets.map((tweet, index) => {
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
