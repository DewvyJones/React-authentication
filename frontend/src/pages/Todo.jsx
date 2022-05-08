import React, { useEffect, useState } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Todolist from "../components/Todolist";

const Container = styled.div`
  text-align: center;
`;

const Todo = () => {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [Todos, setTodos] = useState([]);
  const navigate = useNavigate();

  function fetchUser() {
    axios
      .get("http://localhost:3001/me", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchTodo() {
    axios
      .get("http://localhost:3001/api/todo", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.allTodo);
        setTodos(res.data.allTodo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addTodo(event) {
    event.preventDefault();
    var today = new Date();
    var datepick = new Date(date);
    if (!date) {
      alert("Select Date!");
    }
    if (datepick < today) {
      alert("Can't select past days");
    }
    if (title === "") {
      alert("Title is required");
    } else {
      axios
        .post(
          "http://localhost:3001/api/create/todo",
          {
            formData: {
              title: title,
              deadline: date,
              createBy: user.email,
            },
          },
          {
            headers: {
              "x-access-token": localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          window.location.reload();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (user) {
        fetchUser();
        fetchTodo();
      } else {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Container>
      <h1>Todo</h1>
      <p style={{ color: "green" }}>
        user : {user.name} | email : {user.email} <button>logout</button>
      </p>

      <div className="Container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
            </tr>
          </thead>
          {Todos.map((item, i) => (
            <tbody key={i}>
              <Todolist item={item} />
            </tbody>
          ))}
        </table>
      </div>

      <form onSubmit={addTodo}>
        <label htmlFor="todo">Title : </label>
        <input
          type="text"
          id="todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="date">Date : </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="submit" value="submit" />
      </form>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back to home
      </button>
    </Container>
  );
};

export default Todo;
