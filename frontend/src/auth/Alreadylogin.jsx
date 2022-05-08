import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Alreadylogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (user) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/todo" />;
};

export default Alreadylogin;
