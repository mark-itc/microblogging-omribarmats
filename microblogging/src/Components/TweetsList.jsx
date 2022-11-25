import { Tweet } from "./Tweet";
import { TweetsContext } from "../Contexts/TweetsListContext";
import { useContext } from "react";

export const TweetsList = () => {
  const { tweetsList } = useContext(TweetsContext);

  return (
    <div className="TweetsList">
      {tweetsList.map((tweet, index) => {
        return (
          <Tweet
            key={index}
            text={tweet.text}
            userName={tweet.userName}
            date={tweet.date}
            id={tweet.id}
          />
        );
      })}
    </div>
  );
};
