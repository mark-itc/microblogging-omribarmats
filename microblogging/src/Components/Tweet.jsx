import "../Styles/Tweet.css";

export const Tweet = (props) => {
  return (
    <div className="Tweet">
      <div className="details">
        <div className="userName">{props.userName}</div>
        <div className="date">{props.date.toISOString()}</div>
      </div>
      <p className="content">{props.text}</p>
    </div>
  );
};
