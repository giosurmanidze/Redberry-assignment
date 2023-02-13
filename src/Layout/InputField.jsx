import { GREEN_ICON, RED_ICON } from "../reusableImports/imports";

const InputField = ({
  checkFormEl,
  placeholder,
  name,
  value,
  title,
  handleChange,onKey
}) => {
  return (
    <>
      <h3
        style={{
          color: `${checkFormEl === "" ? "red" : ""}`,
        }}
        className="input__title"
      >
        {title}
      </h3>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => onKey(e)}
        style={{
          border: `${
            checkFormEl === ""
              ? "1px solid red"
              : checkFormEl
              ? "1px solid green"
              : ""
          }`,
        }}
      />
      {checkFormEl && (
        <img src={GREEN_ICON} alt="green" className="green_icon" />
      )}
      {checkFormEl === "" && (
        <img src={RED_ICON} alt="red" className="red__icon" />
      )}
    </>
  );
};

export default InputField;
