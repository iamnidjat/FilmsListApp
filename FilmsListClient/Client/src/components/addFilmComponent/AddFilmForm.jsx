import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import { useTranslation } from "react-i18next";
import styles from "./AddFilmForm.module.css";

const API_URL = "https://localhost:7211/api/v1/FilmsListCRUDOpers/";
const API_URL2 = "https://localhost:7211/api/v1/FilmManager/";

const AddFilmForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(1900);
  const [genre, setGenre] = useState("genre");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [watchList, setWatchList] = useState(
    location.state ? location.state.booleanValue : false
  );

  const [displayRating, setDisplayRating] = useState(rating);

  // Handler function to update rating and displayed rating
  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
    setDisplayRating(value);
  };

  const addFilm = async () => {
    if (genre !== "genre" && title !== "") {
      const isUsed = await filmNameUsed(title);
      if (!isUsed) {
        let film = {
          title: title,
          year: year.toString(),
          genre: genre,
          myComment: comment,
          myRating: rating,
          watchList: watchList,
          userId: localStorage.getItem("userId"),
        };
        await fetch(API_URL + "AddFilm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(film),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((data) => {
            watchList
              ? navigate("/menu/unwatchedfilms")
              : navigate("/menu/watchedfilms");
          })
          .catch((error) => {
            console.error(t("An error occurred:"), error);
            alert(
              t("An error occurred while adding a film. Please try again later.")
            );
          });
      }
      else {
        alert(t("A film with this title already exists!"));
      }
    } else {
      alert(t("Please specify movie genre and title."));
    }
  };

  const filmNameUsed = async (title) => {
    try {
      const response = await fetch(
        API_URL2 + `IsFilmNameUsed?filmName=${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(t("An error occurred:"), error);
      alert(
        t(
          "An error occurred while determining whether a film name is used or not. Please try again later."
        )
      );
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <NavBarComponent />
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Title")}</label>
          <input
            type="text"
            className={styles.input}
            placeholder={t("Enter movie title")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Year (between 1900 and 2025)")}</label>
          <input
            type="number"
            className={styles.input}
            min="1900"
            max="2025"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Genre")}</label>
          <select
            id="genre"
            name="genre"
            className={styles.select}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">{t("Select Genre")}</option>
            <option value="Action">{t("Action")}</option>
            <option value="Comedy">{t("Comedy")}</option>
            <option value="Drama">{t("Drama")}</option>
            <option value="Horror">{t("Horror")}</option>
            <option value="Sci-fi">{t("Science Fiction")}</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Comment")}</label>
          <input
            type="text"
            className={styles.input}
            placeholder={t("Enter a comment")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("Rating (between 0 and 10)")}: {displayRating}</label>
          <input
            type="range"
            className={styles.range}
            min="0"
            max="10"
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <button className={styles.button} onClick={addFilm}>
          {t("Add")}
        </button>
      </div>
    </div>
  );
};

export default AddFilmForm;
