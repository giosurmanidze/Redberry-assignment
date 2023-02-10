import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/appContext";
import { arrowIcon } from "../reusableImports/imports";

const PageHeader = ({ title, status }) => {
  const { clearLocalStorage } = useContext(StoreContext);


  return (
    <div className="header__details">
      <div className="arrow__icon">
        <Link to="/" onClick={clearLocalStorage}>
          <img src={arrowIcon} alt="arrow" />
        </Link>
      </div>
      <div className="general__screen--header">
        <div className="top">
          <h3>{title}</h3>
          <p className="general__screen--status">{status}/3</p>
        </div>
        <div className="general__screen--line" />
      </div>
    </div>
  );
};

export default PageHeader;
