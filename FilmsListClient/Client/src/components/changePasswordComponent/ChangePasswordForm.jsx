import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import styles from './ChangePasswordForm.module.css';

const API_URL = "https://localhost:7211/api/v1/AccountManager/";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();

  const togglePasswordVisibility = (passwordType) => {
    switch (passwordType) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const changePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert(t("New password and confirm password don't match"));
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      
      await fetch(
        API_URL +
          `ChangePassword?userId=${localStorage.getItem(
            "userId"
          )}&oldPassword=${oldPassword}&newPassword=${newPassword}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          alert(
            t(
              "Your password was successfully changed! You'll be navigated to the menu."
            )
          );
          navigate("/main");
        })
        .catch((error) => {
          console.error(t("An error occurred:"), error);
          alert(
            t(
              "An error occurred while changing a password. Please try again later."
            )
          );
        });
    }
  };

  return (
    <div className={styles.container}>
      <NavBarComponent />
    <form className={styles.form} onSubmit={changePassword}>
      <div className={styles.formGroup}>
        <label htmlFor="oldPassword">{t("Old Password")}:</label>
        <input
          type={showOldPassword ? "text" : "password"}
          id="oldPassword"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => togglePasswordVisibility("old")}
        >
          <span className={`fa ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></span>
        </button>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="newPassword">{t("New Password")}:</label>
        <input
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => togglePasswordVisibility("new")}
        >
          <span className={`fa ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></span>
        </button>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">{t("Confirm New Password")}:</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => togglePasswordVisibility("confirm")}
        >
          <span className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></span>
        </button>
      </div>
      <button type="submit" className={styles.submitButton}>{t("Change Password")}</button>
    </form>
  </div>
  );
};

export default ChangePasswordForm;
