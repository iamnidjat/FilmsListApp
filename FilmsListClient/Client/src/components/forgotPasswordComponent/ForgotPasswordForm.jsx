import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import { useTranslation } from "react-i18next";

const API_URL = "https://localhost:7211/api/v1/AccountManager/";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    await fetch(API_URL + `ResetPassword?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        alert(t("Your email was reseted successfully! Check your email!"));
        navigate("/");
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while reseting a password. Please try again later."
          )
        );
      });
  };

  return (
    <div>
      <NavBarComponent />
      <div className="forgot-password-form">
        <h2>{t("Forgot Password")}</h2>
        <form onSubmit={resetPassword}>
          <div className="form-group">
            <label>{t("Email")}:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">{t("Reset Password")}</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
