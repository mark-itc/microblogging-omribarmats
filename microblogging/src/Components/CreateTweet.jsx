import { useState, useContext } from "react";
import "../Styles/CreateTweet.css";
import { TweetsContext } from "../Contexts/TweetContext";
import { Button } from "./Button";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../Contexts/Authcontext";

export const CreateTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const { userName } = useContext(AuthContext);
  const { tweetSuccess, setTweetSuccess, tweets, setTweets } =
    useContext(TweetsContext);

  const tweetsCollectionRef = collection(db, "tweets");

  const handleTweetClick = (tweetText, userName) => {
    const tweet = {
      content: tweetText,
      username: userName,
      date: Timestamp.fromDate(new Date()),
    };
    postTweet(tweet);
    setTweetSuccess(false);
  };

  async function postTweet(tweet) {
    const results = await fetchTweetToFireStore(tweet);
    if (results.success) {
      setTweetSuccess(true);
      setTweets([tweet, ...tweets]);
    } else {
      alert(results.message);
      setTweetSuccess(true);
    }
  }

  async function fetchTweetToFireStore(tweet) {
    try {
      let currentTweet = await addDoc(tweetsCollectionRef, tweet);
      if (currentTweet.id) {
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
      <div className={"createTweetRuler"}>
        {tweetText.length > 140 ? (
          <div className="over140CharsAlert">
            The tweet can't contain more then 140 chars.
          </div>
        ) : null}
        <div class="tweetButton">
          <Button
            text="Tweet"
            type="button"
            disabled={
              tweetText.length > 140 || tweetText.length === 0 || !tweetSuccess
            }
            onClick={(event) => {
              event.preventDefault();
              handleTweetClick(tweetText, userName);
            }}
          />
        </div>

        {!tweetSuccess ? <div className="spinner"></div> : null}
      </div>
    </div>
  );
};
