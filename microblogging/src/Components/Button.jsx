import "../Styles/Button.css";

export const Button = (props) => {
  return (
    <button type={props.type} disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
};
