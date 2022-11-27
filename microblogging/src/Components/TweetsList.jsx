import { useContext } from "react";
import { Tweet } from "./Tweet";
import { TweetsContext } from "../Contexts/TweetContext";

export const TweetsList = () => {
  const { tweetsList } = useContext(TweetsContext);

  return (
    <div className="TweetsList">
      {tweetsList.map((tweet, index) => {
        return (
          <>
            <Tweet
              key={index}
              content={tweet.content}
              userName={tweet.userName}
              date={tweet.date}
            />
          </>
        );
      })}
    </div>
  );
};
