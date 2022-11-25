import "../Styles/CreateTweet.css";
import { TweetsContext } from "../Contexts/TweetsListContext";
import { useState, useContext } from "react";

export const CreateTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { tweetsList, setTweetsList } = useContext(TweetsContext);

  const handleTweetClick = (tweetText, userName) => {
    const tweet = {
      text: tweetText,
      userName: userName,
      date: new Date(),
      id:
        tweetsList.length === 0 ? 1 : tweetsList[tweetsList.length - 1].id + 1,
    };
    setTweetsList([tweet, ...tweetsList]);
  };

  return (
    <div className="CreateTweet">
      <textarea
        onChange={(event) => setTweetText(event.target.value)}
        placeholder="What you have in mind..."
      ></textarea>
      <div
        className={
          tweetText.length > 140
            ? "createTweetButtonDisabled"
            : "createTweetButton"
        }
      >
        <button
          type="button"
          disabled={tweetText.length > 140 ? true : false}
          onClick={(event) => {
            event.preventDefault();
            handleTweetClick(tweetText, "yonatan");
          }}
        >
          Tweet
        </button>

        {tweetText.length > 140 ? (
          <div className="over140CharsAlert">
            The tweet can't contain more then 140 chars.
          </div>
        ) : null}
      </div>
    </div>
  );
};
