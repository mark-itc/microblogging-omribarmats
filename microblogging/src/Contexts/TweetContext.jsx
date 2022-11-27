import { useState, useEffect, createContext } from "react";

const TweetsContext = createContext();

const TweetsProvider = ({ children }) => {
  const [tweetsList, setTweetsList] = useState([]);
  const [tweetSuccess, setTweetSuccess] = useState(true);

  async function asignTwits() {
    const results = await getTweets();
    if (results.success) {
      setTweetsList(results.results);
    } else {
      alert(results.message);
    }
  }

  async function getTweets() {
    try {
      const response = await fetch(
        `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`
      );
      const results = await response.json();
      if (response.ok) {
        return {
          success: true,
          results: results.tweets,
        };
      } else {
        return { success: false, message: "No results found" };
      }
    } catch (e) {
      return { success: false, message: "You request had an error" };
    }
  }

  useEffect(() => {
    asignTwits();
    const interval = setInterval(() => {
      asignTwits();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TweetsContext.Provider
      value={{
        tweetsList,
        setTweetsList,
        tweetSuccess,
        setTweetSuccess,
      }}
    >
      {children}
    </TweetsContext.Provider>
  );
};

export { TweetsContext, TweetsProvider };
