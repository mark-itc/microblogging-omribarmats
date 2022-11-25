import { useState, useEffect, createContext } from "react";
import localForage from "localforage";

const TweetsContext = createContext();

const TweetsProvider = ({ children }) => {
  const [tweetsList, setTweetsList] = useState([]);

  useEffect(() => {
    localForage.setItem("TweetsList", { Tweets: tweetsList });
  }, [tweetsList]);

  async function getLocalTweets() {
    const localTweets = await localForage.getItem("TweetsList");
    if (localTweets) {
      setTweetsList(localTweets.Tweets);
    }
  }

  useEffect(() => {
    getLocalTweets();
  }, []);

  return (
    <TweetsContext.Provider
      value={{
        tweetsList,
        setTweetsList,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export { TweetsContext, TweetsProvider };
