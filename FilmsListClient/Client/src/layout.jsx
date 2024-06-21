import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/menu") {
      navigate("/menu/watchedfilms", { replace: true });
    }
  }, [location.pathname, navigate]);

  return <div>{children}</div>;
};

export default Layout;
