import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function registerUser(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3001/api/register", {
        formData: { name: name, email: email, password: password },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
        setError(`Register fail!`);
        if (error.response.data.error.keyValue) {
          setError(
            `This email : ${error.response.data.error.keyValue.email} has already been used.`
          );
        }
      });
  }

  return (
    <Box>
      <form onSubmit={registerUser}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
          <input type="submit" value="Register" />
        </div>
      </form>
    </Box>
  );
};

export default Register;
