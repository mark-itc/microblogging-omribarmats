import "../Styles/Input.css";

export const Input = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.labelText}</label>
      <input
        onChange={props.onChange}
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
      ></input>
    </div>
  );
};
