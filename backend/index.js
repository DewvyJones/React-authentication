const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

const usersRouter = require("./route/Users");
const todosRouter = require("./route/Todos");

app.use(usersRouter.router);
app.use(todosRouter.router);

app.listen(3001, () => {
  console.log("server started on port 3001");
});
