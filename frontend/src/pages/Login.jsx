import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  function loginUser(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/login", {
        formData: { email: email, password: password },
      })
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          localStorage.setItem("token", res.data.user);
          window.location.href = "/todo";
          // navigate("/todo", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data) {
          setError(error.response.data.message);
        }
      });
  }

  return (
    <Box>
      <form onSubmit={loginUser}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div style={{ textAlign: "center", margin: "10px" }}>
          <input type="submit" value="Login" />
        </div>
      </form>
    </Box>
  );
};

export default Login;
