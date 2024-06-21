import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./FilmInfoForm.module.css";
import { useTranslation } from "react-i18next";

const API_URL = "https://localhost:7211/api/v1/FilmsListCRUDOpers/";

const FilmInfoForm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState({
    title: "",
    year: "",
    genre: "",
    myComment: "",
    myRating: 0,
  });
  const { t } = useTranslation();

  const getFilmDataAsync = async () => {
    try {
      const response = await fetch(API_URL + `GetFilm?filmId=${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFilm(data);
    } catch (error) {
      console.error(t("An error occurred:"), error);
      alert(
        t("An error occurred while getting film data. Please try again later.")
      );
    }
  };

  useEffect(() => {
    getFilmDataAsync();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{film.title}</h2>
      <div className={styles.info}>
        <div>
          <strong>{t("Year")}:</strong> {film.year}
        </div>
        <div>
          <strong>{t("Genre")}:</strong> {film.genre}
        </div>
        <div>
          <strong>{t("Comment")}:</strong> {film.myComment}
        </div>
        <div>
          <strong>{t("Rating")}:</strong> {film.myRating}
        </div>
      </div>
    </div>
  );
};

export default FilmInfoForm;
