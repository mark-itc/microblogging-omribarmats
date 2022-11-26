import "../Styles/Tweet.css";

export const Tweet = (props) => {
  return (
    <div className="Tweet">
      <div className="details">
        <div className="userName">{props.userName}</div>
        <div className="date">{props.date}</div>
      </div>
      <p className="content">{props.content}</p>
    </div>
  );
};
