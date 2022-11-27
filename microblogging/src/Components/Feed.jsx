import { CreateTweet } from "./CreateTweet";
import { TweetsList } from "./TweetsList";
import "../Styles/Feed.css";

export const Feed = () => {
  return (
    <div className="feed">
      <CreateTweet />
      <TweetsList />
    </div>
  );
};
