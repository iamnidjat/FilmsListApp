import React, { useState, useEffect } from "react";
import CustomButtonComponent from "../../UI/button/CustomButtonComponent";
import CustomInputComponent from "../../UI/input/CustomInputComponent";
import NavBarComponent from "../navbarComponent/NavBarComponent";
import styles from "./AuthorizationForm.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropagateLoader from "react-spinners/PropagateLoader";

const API_URL = "https://localhost:7211/api/v1/Authentication/";
const API_URL2 = "https://localhost:7211/api/v1/AccountManager/";

const AuthorizationForm = () => {
  const [flag, setFlag] = useState(false);
  const [display, setDisplay] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  let signUpText = t("Sign Up for Free");
  let logInText = t("Welcome back");
  const [text, setText] = useState(signUpText);

  let getStartedText = t("GET STARTED");
  let buttonLogInText = t("Log in");
  const [buttonText, setButtonText] = useState(getStartedText);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rememberme")) {
      navigate("/menu");
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userMail");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const logIn = async () => {
    setLoading(true);
    let user = { username: username, password: password };

    await fetch(API_URL + "Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          alert(t("Incorrect username or password!"));
          setUsername("");
          setPassword("");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.username);
        localStorage.setItem("userMail", data.email);
        localStorage.setItem("isAuthenticated", true);
        if (rememberMe) {
          localStorage.setItem("rememberme", true);
        }
        navigate("/menu/watchedfilms");
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const signUp = async () => {
    if (password === confirmPassword) {
      setLoading(true);
      let user = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
      };

      await fetch(API_URL + "Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            alert(t("This username is already in use!"));
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userName", data.username);
          localStorage.setItem("userMail", data.email);
          localStorage.setItem("isAuthenticated", true);
          navigate("/menu/watchedfilms");
        })
        .catch((error) => {
          console.error(t("An error occurred:"), error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert(t("Password and confirm password don't match"));
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
    }
  };

  const getRandomUsername = async () => {
    await fetch(API_URL2 + "GetRandomUsername", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        setUsername(data);
      })
      .catch((error) => {
        console.error(t("An error occurred:"), error);
        alert(
          t(
            "An error occurred while generating a random login. Please try again later."
          )
        );
      });
  };

  const setTextAndButton = () => {
    setText(flag ? logInText : signUpText);
    setButtonText(flag ? buttonLogInText : getStartedText);
    setDisplay(!flag);
  };

  useEffect(() => {
    setTextAndButton();
  }, [flag]);

  const renderInputField = (
    type,
    placeholder,
    display,
    value = "",
    setValue = () => {},
    showParticularField = "",
    showEyeIcon = false,
    toggleVisibility = () => {}
  ) => (
    <div>
      <CustomInputComponent
        type={
          type === "password" && showEyeIcon
            ? showParticularField
              ? "text"
              : "password"
            : type
        }
        placeholder={placeholder}
        //   styles={inputStyles}
        display={display}
        value={value}
        setValue={(e) => setValue(e.target.value)}
        eventHandler={(e) => {
          e.preventDefault();
        }}
      />
      {showEyeIcon && (
        <button
          style={{
            display:
              showParticularField == "showPassword"
                ? display
                  ? "block"
                  : "none"
                : true,
          }}
          onClick={toggleVisibility}
        >
          <span
            className={`fa ${showParticularField ? "fa-eye-slash" : "fa-eye"}`}
          ></span>
        </button>
      )}
    </div>
  );

  return (
    <div>
      <NavBarComponent />
      <div
        style={{ display: loading ? "flex" : "none", flexDirection: "column" }}
      >
        <PropagateLoader color="#fff" loading={loading} size={30} />
        <div>{!display ? "Logging in..." : "Signing up..."}</div>
      </div>
      <div className={styles.authForm}>
        <div className={styles.buttonsDiv}>
          <CustomButtonComponent
            textSize={20}
            textWeight={200}
            styles={{
              background: "#1ab188",
              padding: "10px 10px",
              // borderRadius: "15px",
              color: "#fff",
              cursor: "pointer",
              outline: "none",
              border: "none",
              fontSize: "20px",
              fontWeight: "200",
              marginRight: "10px",
            }}
            text={t("Sign Up")}
            value={flag}
            onClick={() => {
              setFlag(false);
              setUsername("");
              setPassword("");
            }}
          />
          <CustomButtonComponent
            styles={{
              background: "#1ab188",
              padding: "10px 10px",
              // borderRadius: "15px",
              color: "#fff",
              cursor: "pointer",
              outline: "none",
              border: "none",
              fontSize: "20px",
              fontWeight: "200",
            }}
            text={t("Log in")}
            value={flag}
            onClick={() => {
              setFlag(true);
              setUsername("");
              setPassword("");
            }}
          />
        </div>
        <div className={styles.mainDiv}>
          <div className={styles.text}>{text}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {renderInputField(
              "text",
              t("Enter your username"),
              true,
              username,
              setUsername
            )}
            <button
              style={{ display: display ? "block" : "none" }}
              onClick={getRandomUsername}
            >
              <span className="fa fa-user"></span>
            </button>
          </div>
          {renderInputField(
            "text",
            t("Enter your email address"),
            display,
            email,
            setEmail
          )}
          {renderInputField(
            "password",
            t("Set a password"),
            true,
            password,
            setPassword,
            showPassword,
            true,
            togglePasswordVisibility
          )}
          {renderInputField(
            "password",
            t("Confirm the password"),
            display,
            confirmPassword,
            setConfirmPassword,
            showConfirmPassword,
            true,
            toggleConfirmPasswordVisibility
          )}
          <div style={{ display: !display ? "block" : "none" }}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              {t("Remember me")}
            </label>
          </div>
          <div
            style={{
              display: !display ? "block" : "none",
              color: "white",
              margin: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/forgotPassword");
            }}
          >
            {t("Forgot Password")}
          </div>
          <CustomButtonComponent
            textSize={30}
            textWeight={300}
            text={buttonText}
            onClick={() => (flag ? logIn() : signUp())}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;
