import "../Styles/Feed.css";
import { CreateTweet } from "./CreateTweet";
import { TweetsList } from "./TweetsList";

export const Feed = () => {
  return (
    <div className="feed">
      <CreateTweet />
      <TweetsList />
    </div>
  );
};
