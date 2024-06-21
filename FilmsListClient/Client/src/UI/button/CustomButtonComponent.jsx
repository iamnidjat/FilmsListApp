import React from "react";
import myStyles from "./CustomButtonComponent.module.css";

const CustomButtonComponent = ({
  text,
  onClick,
  styles,
}) => {
  return (
    <button
      className={myStyles.button}
      style={styles}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButtonComponent;

// = {
//   background,
//   padding,
//   borderRadius,
//   borderColor,
//   color,
//   cursor,
//   outline,
//   border,
// }
