import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./NavBarComponent.module.css";

const NavBarComponent = () => {
  const navigate = useNavigate();
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  const handleChangeLanguage = (newLanguage) => {
    localStorage.setItem("lang", newLanguage);
    changeLanguage(newLanguage);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className={styles.nav}>
    <div className={styles.title} onClick={() => {navigate("/menu")}}>{t("FilmsList")}</div>
    <div className={styles.menu}>
      <button
        onClick={handleLogout}
        className={styles.button}
        style={{
          display:
            localStorage.getItem("isAuthenticated") === "true"
              ? "block"
              : "none",
        }}
      >
        {t("Exit")}
      </button>
      <Link
        to="/sendFeedback"
        className={styles.link}
        style={{
          display:
            localStorage.getItem("isAuthenticated") === "true"
              ? "block"
              : "none",
        }}
      >
        {t("Send Feedback")}
      </Link>
      <Link
        to="/deleteAccount"
        className={styles.link}
        style={{
          display:
            localStorage.getItem("isAuthenticated") === "true"
              ? "block"
              : "none",
        }}
      >
        {t("Delete Account")}
      </Link>
      <Link
        to="/changePassword"
        className={styles.link}
        style={{
          display:
            localStorage.getItem("isAuthenticated") === "true"
              ? "block"
              : "none",
        }}
      >
        {t("Change Password")}
      </Link>
      <div className={styles.languageButton}>
        <button
          className={styles.button}
          onClick={() => handleChangeLanguage("en")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/555/555417.png"
            alt="en"
            className={styles.langImage}
          />
        </button>
        <button
          className={styles.button}
          onClick={() => handleChangeLanguage("ru")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/330/330437.png"
            alt="ru"
            className={styles.langImage}
          />
        </button>
        <button
          className={styles.button}
          onClick={() => handleChangeLanguage("az")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/330/330544.png"
            alt="az"
            className={styles.langImage}
          />
        </button>
      </div>
    </div>
  </nav>
  );
};

export default NavBarComponent;
