import React, { useState } from "react";
import styles from "./SendFeedbackForm.module.css";
import { useNavigate } from "react-router-dom";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import { useTranslation } from "react-i18next";

const API_URL = "https://localhost:7211/api/v1/Feedback/";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendFeedback = async (e) => {
    e.preventDefault();

    await fetch(API_URL + "SendFeedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        alert("Thank you for your feedback! You'll be navigated to the menu.");
        navigate("/menu");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        alert(
          "An error occurred while sending a feedback. Please try again later."
        );
      });
  };

  return (
    <div>
    <NavBarComponent />
    <div className={styles.feedbackForm}>
      <h2 className={styles.title}>{t("Send Feedback")}</h2>
      <form className={styles.form} onSubmit={sendFeedback}>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Name")}</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Last name")}</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Phone")}</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Email")}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Suggestion")}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          {t("Submit")}
        </button>
      </form>
    </div>
  </div>
  );
};

export default FeedbackForm;
