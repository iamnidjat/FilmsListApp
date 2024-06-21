import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./NotFoundPage.module.css";
import NavBarComponent from "../navbarComponent/NavBarComponent";

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className={styles.container}>
      <NavBarComponent />
      <h1 className={styles.title}>{t("404 - Not Found")}</h1>
      <p className={styles.message}>{t("Sorry, the page you are looking for does not exist.")}</p>
    </div>
  );
};

export default NotFoundPage;
