import * as React from "react";
import "./Header.scss";
import icon from "../../images/icon.png";

export const Header = () => {
  return (
    <div className="Header"> 
      <img style={{width:"80px"}} src={icon} alt="Logo" />
      <h1>NFCapture</h1>
    </div>
  )
}