import "../Styles/CreateTweet.css";
import { useState, useContext } from "react";
import { TweetsContext } from "../Contexts/TweetContext";

export const CreateTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { tweetSuccess, setTweetSuccess } = useContext(TweetsContext);

  const handleTweetClick = (tweetText, userName) => {
    const tweet = {
      content: tweetText,
      userName: userName,
      date: new Date().toISOString(),
    };
    postTweet(tweet);
    setTweetSuccess(false);
  };

  async function postTweet(tweet) {
    const results = await fetchTweetToAPI(tweet);
    if (results.success) {
      setTweetSuccess(true);
    } else {
      alert(results.message);
      setTweetSuccess(true);
    }
  }

  async function fetchTweetToAPI(tweet) {
    const requestMessage = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tweet),
    };
    try {
      const response = await fetch(
        `https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet`,
        requestMessage
      );
      if (response.ok) {
        return {
          success: true,
        };
      } else {
        return { success: false, message: "Tweet failed" };
      }
    } catch (e) {
      return { success: false, message: "You request had an error" };
    }
  }

  return (
    <div className="CreateTweet">
      <textarea
        onChange={(event) => setTweetText(event.target.value)}
        placeholder="What you have in mind..."
      ></textarea>
      <div
        className={
          tweetText.length > 140 || tweetText.length === 0 || !tweetSuccess
            ? "createTweetButtonDisabled"
            : "createTweetButton"
        }
      >
        <button
          type="button"
          disabled={
            tweetText.length > 140 || tweetText.length === 0 || !tweetSuccess
          }
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

        {!tweetSuccess ? <div className="spinner"></div> : null}
      </div>
    </div>
  );
};
