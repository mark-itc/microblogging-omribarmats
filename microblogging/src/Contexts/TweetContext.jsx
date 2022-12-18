import { useState, createContext } from "react";

const TweetsContext = createContext();

const TweetsProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetSuccess, setTweetSuccess] = useState(true);

  return (
    <TweetsContext.Provider
      value={{
        tweets,
        setTweets,
        tweetSuccess,
        setTweetSuccess,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export { TweetsContext, TweetsProvider };
