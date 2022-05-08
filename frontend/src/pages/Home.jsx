import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Container = styled.div`
  text-align: center;
`;

const Button = styled.button`
  margin: 10px;
  font-size: 20px;
`;

const Home = () => {
  const navigate = useNavigate();
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

  if (isLoggedIn) {
    return (
      <Container>
        <h1>Hello, this is todo app for basic auth with Node.js + MongoDB</h1>
        <Button onClick={() => navigate("/todo", { replace: false })}>
          My Todos
        </Button>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Hello, this is todo app for basic auth with Node.js + MongoDB</h1>
        <Button onClick={() => navigate("/login", { replace: false })}>
          Login
        </Button>
        <Button onClick={() => navigate("/register", { replace: false })}>
          Register
        </Button>
      </Container>
    );
  }
};

export default Home;
