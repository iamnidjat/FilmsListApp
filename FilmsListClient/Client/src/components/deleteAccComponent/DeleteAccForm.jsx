import React, { useState } from "react";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./DeleteAccForm.module.css";

const API_URL = "https://localhost:7211/api/v1/AccountManager/";

const DeleteAccountForm = () => {
  const [reason, setReason] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleConfirmationChange = (event) => {
    setConfirmation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (reason && confirmation.toLowerCase() === "yes") {
      let deletedAcc = {
        username: localStorage.getItem("userName"),
        email: localStorage.getItem("userMail"),
        reason: reason,
      };
      await fetch(
        API_URL + `DeleteAccount?userId=${localStorage.getItem("userId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deletedAcc),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((data) => {
          alert(t("You successfully deleted your account!"));
          navigate("/");
        })
        .catch((error) => {
          console.error(t("An error occurred:"), error);
          alert(
            t(
              "An error occurred while getting deleting an account. Please try again later."
            )
          );
        });
    } else {
      alert(
        t('Please select a reason and type "yes" in the confirmation field.')
      );
    }
  };

  return (
    <div className={styles.container}>
      <NavBarComponent />
      <h2 className={styles.title}>{t("Delete Account")}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="radio"
              name="reason"
              value="Not interested"
              checked={reason === "Not interested"}
              onChange={handleReasonChange}
            />
            {t("Not interested")}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="radio"
              name="reason"
              value="Bad interface"
              checked={reason === "Bad interface"}
              onChange={handleReasonChange}
            />
            {t("Bad interface")}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="radio"
              name="reason"
              value="Bad features"
              checked={reason === "Bad features"}
              onChange={handleReasonChange}
            />
            {t("Bad features")}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="radio"
              name="reason"
              value="Found new website"
              checked={reason === "Found new website"}
              onChange={handleReasonChange}
            />
            {t("Found new website")}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <input
              type="radio"
              name="reason"
              value="Other"
              checked={reason === "Other"}
              onChange={handleReasonChange}
            />
            {t("Other")}
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            {t('Type "yes" to confirm deletion')}:
            <input
              type="text"
              value={confirmation}
              onChange={handleConfirmationChange}
            />
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          {t("Delete Account")}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
