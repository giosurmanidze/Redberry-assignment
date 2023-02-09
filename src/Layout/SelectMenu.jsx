import GREEN_ICON from '../assets/images/done-green-circle.png'
import RED_ICON from '../assets/images/warning-red-circle.png'

const SelectMenu = ({ value, errors, errorEl, handleInputChange, degrees }) => {
  return (
    <>
      <h3 
         style={{
          color: `${errors && errorEl === "Invalid" ? "red" : ""}`,
        }}
      >ხარისხი</h3>
      <select value={value} onChange={handleInputChange}
           style={{
            border: `${
            errors && errorEl === "Invalid"
              ? "1px solid red"
              : errors && errorEl === "Correct"
              ? "1px solid green"
              : ""
          }`,
        }}
      >
        <option value="none" selected disabled hidden>
          აირჩიეთ ხარისხი
        </option>
        {degrees?.map((option, i) => (
          <option key={i} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
      {errors && errorEl === "Invalid" && (
        <img src={RED_ICON} alt="red" className="red__icon" />
      )}
      {errors && errorEl === "Correct" && (
        <img src={GREEN_ICON} alt="green" className="green_icon green__icon" />
      )}
    </>
  );
};

export default SelectMenu;
