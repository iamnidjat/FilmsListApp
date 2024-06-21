import React from "react";
import styles from "./CustomInputComponent.module.css";

const CustomInputComponent = ({ type, placeholder, display, value, setValue, eventHandler }) => {
  return (
    <input
      className={styles.input}
      style={{ display: display ? 'block' : 'none' }}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={setValue}
      onCut={eventHandler}
      onPaste={eventHandler}
      onCopy={eventHandler}
    />
  );
};

export default CustomInputComponent;
