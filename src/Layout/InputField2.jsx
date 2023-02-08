import GREEN_ICON from "../assets/images/done-green-circle.png";
import RED_ICON from "../assets/images/warning-red-circle.png";

const InputField2 = ({
  type,
  errors,
  value,
  handleInputChange,
  placeholder,
  title,
  name,
  errorEl,
}) => {
  return (
    <>
      <h3
        style={{
          color: `${errors && errorEl === "Invalid" ? "red" : ""}`,
        }}
      >
        {title}
      </h3>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleInputChange}
        style={{
            border: `${
            errors && errorEl === "Invalid"
              ? "1px solid red"
              : errors && errorEl === "Correct"
              ? "1px solid green"
              : ""
          }`,
        }}
      />
      {errors && errorEl === "Invalid" && (
        <img src={RED_ICON} alt="red" className="red__icon" />
      )}
      {errors && errorEl === "Correct" && (
        <img src={GREEN_ICON} alt="green" className="green_icon green__icon" />
      )}
    </>
  );
};

export default InputField2;
