import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthorizationForm from "../components/authComponent/AuthorizationForm";
import MainMenuForm from "../components/mainMenuComponent/MainMenuForm";
import AddFilmForm from "../components/addFilmComponent/AddFilmForm";
import FeedbackForm from "../components/sendFeedbackComponent/SendFeedbackForm";
import ForgotPasswordForm from "../components/forgotPasswordComponent/ForgotPasswordForm";
import NotFoundPage from "../components/notFoundComponent/NotFoundPage";
import DeleteAccountForm from "../components/deleteAccComponent/DeleteAccForm";
import FilmInfoForm from "../components/filmInfo/FilmInfoForm";
import ChangePasswordForm from "../components/changePasswordComponent/ChangePasswordForm";
import Layout from "../layout";

const RouteNavigator = () => {
  const GuardedMainMenuRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <MainMenuForm /> : <Navigate to="/" />;
  };

  const GuardedAddFilmRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <AddFilmForm /> : <Navigate to="/" />;
  };

  const GuardedSendFeedbackRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <FeedbackForm /> : <Navigate to="/" />;
  };

  const GuardedDeleteAccRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <DeleteAccountForm /> : <Navigate to="/" />;
  };

  const GuardedFilmInfoRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <FilmInfoForm /> : <Navigate to="/" />;
  };

  const GuardedChangePasswordRoute = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    return isAuthenticated ? <ChangePasswordForm /> : <Navigate to="/" />;
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<AuthorizationForm />} />
          <Route path="/menu/:category" element={<GuardedMainMenuRoute />} />
          <Route path="/addFilm" element={<GuardedAddFilmRoute />} />
          <Route path="/sendFeedback" element={<GuardedSendFeedbackRoute />} />
          <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
          <Route path="/deleteAccount" element={<GuardedDeleteAccRoute />} />
          <Route path="/filmInfo/:id" element={<GuardedFilmInfoRoute />} />
          <Route
            path="/changePassword"
            element={<GuardedChangePasswordRoute />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default RouteNavigator;
