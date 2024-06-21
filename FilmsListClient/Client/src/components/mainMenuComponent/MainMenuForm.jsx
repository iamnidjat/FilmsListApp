import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styles from "./MainMenuForm.module.css";

const API_URL = "https://localhost:7211/api/v1/FilmsListCRUDOpers/";
const API_URL2 = "https://localhost:7211/api/v1/DownloadQuiz/";
const API_URL3 = "https://localhost:7211/api/v1/FilmManager/";

const MainMenuForm = () => {
  const [films, setFilms] = useState([]);

  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [genre, setGenre] = useState();
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();

  const [originalTitle, setOriginalTitle] = useState();
  const [originalYear, setOriginalYear] = useState();
  const [originalGenre, setOriginalGenre] = useState();
  const [originalComment, setOriginalComment] = useState();
  const [originalRating, setOriginalRating] = useState();

  const [flag, setFlag] = useState(false);

  const [editingFilmId, setEditingFilmId] = useState();

  const { category } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (category === "watchedfilms") {
      downloadFilmsAsync();
    } else if (category === "unwatchedfilms") {
      downloadWatchListFilmsAsync();
    }
  }, [category]);

  const downloadFilmsAsync = async () => {
    setFlag(false);
    navigate("/menu/watchedfilms");
    await fetch(API_URL + `GetFilms?userId=${localStorage.getItem("userId")}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while downloading your list of films. Please try again later."
          )
        );
      });
  };

  const downloadWatchListFilmsAsync = async () => {
    setFlag(true);
    navigate("/menu/unwatchedfilms");
    await fetch(
      API_URL + `GetWatchListFilms?userId=${localStorage.getItem("userId")}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while downloading your list of films (watch list). Please try again later."
          )
        );
      });
  };

  const toAddFilm = () => {
    if (flag) {
      const booleanValue = true;
      navigate("/addFilm", { state: { booleanValue } });
    } else {
      navigate("/addFilm");
    }
  };

  const updateFilmAsync = async (id) => {
    let film = {
      title: title,
      year: year.toString(),
      genre: genre,
      myComment: comment,
      myRating: rating,
      watchlist: flag,
      userId: localStorage.getItem("userId"),
    };

    await fetch(API_URL + `UpdateFilm?filmId=${id}`, {
      method: "PATCH",
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
        setEditingFilmId();
        if (flag) {
          downloadWatchListFilmsAsync();
        } else {
          downloadFilmsAsync();
        }
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t("An error occurred while updating a film. Please try again later.")
        );
      });
  };

  const deleteFilmAsync = async (id) => {
    await fetch(API_URL + `DeleteFilm?filmId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, year }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        if (flag) {
          downloadWatchListFilmsAsync();
        } else {
          downloadFilmsAsync();
        }
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t("An error occurred while deleting a film. Please try again later.")
        );
      });
  };

  const enterEditMode = (film) => {
    setOriginalTitle(film.title);
    setOriginalYear(film.year);
    setOriginalGenre(film.genre);
    setOriginalComment(film.myComment);
    setOriginalRating(film.myRating);

    setTitle(film.title);
    setYear(film.year);
    setGenre(film.genre);
    setComment(film.myComment);
    setRating(film.myRating);

    setEditingFilmId(film.id);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(films);
  }, [films]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = films.filter(
      (film) =>
        film.title.toLowerCase().includes(query.toLowerCase()) ||
        film.year.toLowerCase().includes(query.toLowerCase()) ||
        film.genre.toLowerCase().includes(query.toLowerCase()) ||
        String(film.myRating).toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toWatchListAsync = async (id) => {
    await fetch(API_URL3 + `ToWatchList?filmId=${id}`, {
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
        navigate("/menu/unwatchedfilms");
        downloadWatchListFilmsAsync();
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while downloading your list of films (watch list). Please try again later."
          )
        );
      });
  };

  const toUnWatchListAsync = async (id) => {
    await fetch(API_URL3 + `ToUnWatchList?filmId=${id}`, {
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
        navigate("/menu/watchedfilms");
        downloadFilmsAsync();
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while downloading your list of films. Please try again later."
          )
        );
      });
  };

  const downloadFilmsLocallyAsync = async (format) => {
    try {
      let body = { quizContent: JSON.stringify(filteredData), fileName: "aaa" }; //
      const response = await axios.post(API_URL2 + `download/${format}`, body, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `data.${format}`);

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(t("Error downloading data:"), error);
      alert(
        t(
          "An error occurred while downloading locally your list of films. Please try again later."
        )
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages =
    filteredData.length > 0 ? Math.ceil(filteredData.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <NavBarComponent />
      <div className={styles.header}>
        <div className={styles.title}>{t("Films")}</div>
        <button className={styles.button} onClick={toAddFilm}>
          {flag ? t("Add film to Watch List") : t("Add film")}
        </button>
      </div>

      <div className={styles.header}>
        <button
          className={styles.secondaryButton}
          onClick={() => downloadFilmsLocallyAsync("txt")}
        >
          {t("Download as .txt")}
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => downloadFilmsLocallyAsync("docx")}
        >
          {t("Download as .docx")}
        </button>
        <button
          className={styles.secondaryButton}
          onClick={() => downloadFilmsLocallyAsync("json")}
        >
          {t("Download as .json")}
        </button>
      </div>

      <div className={styles.header}>
        <button className={styles.button} onClick={downloadFilmsAsync}>
          {t("Watched Films")}
        </button>
        <button className={styles.button} onClick={downloadWatchListFilmsAsync}>
          {t("Unwatched Films")}
        </button>
      </div>

      <input
        type="text"
        className={styles.input}
        placeholder={t(
          "Search either by title or by year or by genre or by rating"
        )}
        value={searchQuery}
        onChange={handleSearch}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>No</th>
            <th className={styles.thStyle}>{t("Title")}</th>
            <th className={styles.thStyle}>{t("Year")}</th>
            <th className={styles.thStyle}>{t("Genre")}</th>
            <th className={styles.thStyle}>{t("Comment")}</th>
            <th className={styles.thStyle}>{t("Rating")}</th>
            <th className={styles.thStyle}>{t("Actions")}</th>
          </tr>
        </thead>
        <tbody>
          {currentData?.map((film, index) => (
            <tr key={film.id}>
              {!editingFilmId || editingFilmId !== film.id ? (
                <>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <Link to={`/filmInfo/${film.id}`} className={styles.link}>
                      {film.title}
                    </Link>
                  </td>
                  <td>{film.year}</td>
                  <td>{film.genre}</td>
                  <td>{film.myComment}</td>
                  <td>{film.myRating}</td>
                </>
              ) : (
                <>
                  <td>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1900"
                      max="2025"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <select
                      id="genre"
                      name="genre"
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      className={styles.select}
                    >
                      <option value="action">{t("Action")}</option>
                      <option value="comedy">{t("Comedy")}</option>
                      <option value="drama">{t("Drama")}</option>
                      <option value="horror">{t("Horror")}</option>
                      <option value="sci-fi">{t("Science Fiction")}</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className={styles.input}
                    />
                  </td>
                  <td>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className={styles.range}
                    />
                  </td>
                </>
              )}
              <td>
                <div className={styles.actions}>
                  {!editingFilmId || editingFilmId !== film.id ? (
                    <button
                      className={styles.actionButton}
                      onClick={() => enterEditMode(film)}
                    >
                      {t("Edit")}
                    </button>
                  ) : (
                    <button
                      className={styles.actionButton}
                      onClick={() => updateFilmAsync(film.id)}
                    >
                      {t("Update")}
                    </button>
                  )}
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteFilmAsync(film.id)}
                  >
                    {t("Delete")}
                  </button>
                  <button
                    className={`${styles.actionButton} ${styles.watchListButton}`}
                    onClick={() =>
                      flag
                        ? toUnWatchListAsync(film.id)
                        : toWatchListAsync(film.id)
                    }
                  >
                    {flag ? t("To Main List") : t("To Watch List")}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t("Previous")}
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default MainMenuForm;
